import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {BeatLoader} from "react-spinners";
import Error from "@/components/Error.jsx";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import {login} from "@/db/apiAuth";
import {useNavigate, useSearchParams} from "react-router-dom";
import {UrlState} from "@/context.jsx";


const Login = () => {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const {data, loading, error, fn: fnLogin} = useFetch(login, formData)
    const { fetchUser } = UrlState();
    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard${longLink ? `?createNew=${longLink}` : ""}`);
            fetchUser();
        }
    }, [data, error, fetchUser, longLink, navigate]);

    const handleLogin = async () => {
        setErrors([]);

        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
            });

            await schema.validate(formData, {abortEarly: false});
            await fnLogin();
        } catch (e) {
            const newErrors = {};

            if (e?.inner) {
                e.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
            }

            setErrors(newErrors);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    to your account if you already have one
                </CardDescription>
                {error && <Error message={error?.message || "An unknown error occurred"}/>}

            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.email && <Error message={errors.email}/>}
                <div className="space-y-1">
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.password && <Error message={errors.password}/>}
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin} className='w-full'>
                    {loading ? <BeatLoader size={10} color="#36d7b7"/> : "Login"}
                </Button>
            </CardFooter>
        </Card>
    )
}
export default Login
