import { ErrorMessage, Field, Form, Formik } from "formik"
import { NextPage, NextPageContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import * as yup from "yup"
import { UserService } from "../services"

type InitialValues = {
  username: string
  password: string
}

const Login: NextPage = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError(null)
    }, 3000)

    return () => {
      clearTimeout(errorTimeout)
    }
  }, [error])

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={yup.object({
          username: yup.string().required(),
          password: yup.string().required(),
        })}
        onSubmit={async ({ username, password }: InitialValues) => {
          setLoading(true)
          // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
          const [_, authenticationError] = await UserService.authenticateUser(
            username,
            password
          )

          setLoading(false)
          if (error) {
            toast.error(authenticationError.message)
            return
          }

          router.push("/")
        }}
      >
        <Form
          className="flex flex-col w-full mx-4 overflow-y-auto md:max-w-md"
          method="post"
        >
          <h1 className="mb-8 text-4xl font-bold md:text-center text-light-100">
            Login to continue<span className="text-primary-100">.</span>
          </h1>
          {error && (
            <p className="bg-red-500 text-sm text-light-100 p-2 rounded-[10px] mb-2">
              {error}
            </p>
          )}
          <div className="flex flex-col px-1 mb-4">
            <label className="mb-2 text-light-100" htmlFor="username">
              Username
            </label>
            <Field
              placeholder="john_0x"
              className="p-4 rounded-[10px] outline-primary-100 bg-dark-80 text-light-80 placeholder:text-light-60"
              id="username"
              name="username"
              type="text"
            />
            <p className="mt-1 text-xs text-red-500">
              <ErrorMessage name="username" />
            </p>
          </div>
          <div className="flex flex-col px-1 mb-4">
            <label className="mb-2 text-light-100" htmlFor="password">
              Password
            </label>
            <Field
              placeholder="********"
              className="p-4 rounded-[10px] bg-dark-80 text-light-80 placeholder:text-light-60"
              id="password"
              name="password"
              type="password"
            />
            <p className="mt-1 text-xs text-red-500">
              <ErrorMessage name="password" />
            </p>
          </div>
          <button
            type="submit"
            className=" block text-light-80 px-8 bg-primary-100 py-4 font-bold rounded-[10px] mt-2"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <Link href="/register">
            <a className="mt-2 text-sm hover:underline text-primary-100">
              Dont have an account?
            </a>
          </Link>
        </Form>
      </Formik>
    </div>
  )
}

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  if (req?.headers.cookie) {
    const cookies = req?.headers.cookie as string

    console.log(req?.headers, "cookies g")

    const [response, error] = await UserService.getCurrentUser({
      Cookie: cookies,
    })

    const user = response?.data
    console.log(error)
    if (user) {
      res
        ?.writeHead(302, {
          Location: "/",
        })
        .end()

      return {
        props: {},
      }
      // return {
      //     redirect: {
      //         destination: "/",
      //         permanent: false
      //     }
      // }
    }
  }

  return {
    props: {},
  }
}

export default Login
