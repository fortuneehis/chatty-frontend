import { ErrorMessage, Field, Form, Formik } from "formik"
import { NextPage, NextPageContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import * as yup from "yup"
import { UserService } from "../services"

type InitialValues = {
  username: string
  password: string
}

const Register: NextPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[] | null>(
    null
  )
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError(null)
      setValidationErrors(null)
    }, 3000)

    return () => {
      clearTimeout(errorTimeout)
    }
  }, [error, validationErrors])

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={yup.object({
          username: yup.string().required().min(2).max(15),
          password: yup.string().required().min(8),
        })}
        onSubmit={async ({ username, password }: InitialValues) => {
          setLoading(true)
          // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
          const [_, registrationError] = await UserService.createUser(
            username,
            password
          )
          setLoading(false)

          if (error) {
            if (
              registrationError.name === "ValidationError" &&
              registrationError.errors
            ) {
              setValidationErrors(() => registrationError.errors)
            }
            setError(() => registrationError.message)
            return
          }

          router.push("/login")
        }}
      >
        <Form className="flex flex-col w-full mx-4 md:max-w-md" method="post">
          <h1 className="mb-8 text-4xl font-bold md:text-center text-light-100">
            Welcome to Chatty<span className="text-primary-100">.</span>
          </h1>
          {validationErrors &&
            validationErrors.map((validationError, index) => (
              <p
                key={index}
                className="bg-red-500 text-sm text-light-100 p-2 rounded-[10px] mb-2"
              >
                {validationError}
              </p>
            ))}
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
              className="rounded-[10px] p-4 outline-primary-100 bg-dark-80 text-light-80 placeholder:text-light-60"
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
            {loading ? "Loading..." : "Create account"}
          </button>
          <Link href="/login">
            <a className="mt-2 text-sm hover:underline text-primary-100">
              Already have an account?
            </a>
          </Link>
        </Form>
      </Formik>
    </div>
  )
}

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  const cookies = req?.headers.cookie as string

  const [response, userError] = await UserService.getCurrentUser({
    Cookie: cookies,
  })

  console.log(userError)

  const user = response?.data

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

  return {
    props: {},
  }
}

export default Register
