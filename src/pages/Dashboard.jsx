import {BarLoader} from "react-spinners";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const Dashboard = () => {
    return (
        <section>
            {true && <BarLoader width={"100%"} color="#36d7b7" />}
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                </Card>

            </div>
        </section>
    )
}

export default Dashboard