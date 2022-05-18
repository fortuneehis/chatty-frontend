import { Field, Form, Formik } from "formik"
import { NextPage, NextPageContext } from "next"
import { useRouter } from "next/router"
import { useUser } from "../provider/hooks"
import { UserService } from "../services"




type InitialValues = {
    username: string
    password: string
}

const Login: NextPage  = () => {

    const router = useRouter()

    return (
        <div>
            <Formik initialValues={{
                username: "",
                password: ""
            }} 
            onSubmit={async({username, password}: InitialValues)=>{
                const [_, error] = await UserService.authenticateUser(username, password)
                if(error) {
                    console.log(error)
                }
                
                router.push("/")
                
            }}>
                <Form>
                    <Field name="username" type="text"/>
                    <Field name="password" type="password"/>
                    <button className="p-2" type="submit">Login</button>
                </Form>
            </Formik>
        </div>

    )
}

export const getServerSideProps = async ({req, res}: NextPageContext) => {
        
        const cookies = req?.headers.cookie as string

        const [response, error] = await UserService.getCurrentUser({
            Cookie: cookies
        })

        const user = response?.data

        if(user) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }


        return {
            props: {}
        }

        
}


export default Login