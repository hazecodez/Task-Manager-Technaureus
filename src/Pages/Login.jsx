import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { BsPersonRaisedHand } from "react-icons/bs";
import { SiGnuprivacyguard } from "react-icons/si";
import Signup from "./Signup";
import { useFormik } from "formik";
import { LoginSchema } from "../Validations/LoginSchema";
import { userLogin } from "../Services/Apis";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [type, setType] = useState("login");
  const navigate = useNavigate();

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: Submission,
    });

  async function Submission(formData) {
    try {
      const response = await userLogin(formData);
      if (response?.data.access) {
        toast.success("Successfully logged");
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        navigate("/");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center h-screen justify-center bg-gray-500 ">
      <Card className="w-full max-w-[30rem] mt-5">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >
          <div className="mb-4 h-20 p-6 text-white">
            {type === "login" ? (
              <BsPersonRaisedHand className="h-10 w-10 text-white" />
            ) : (
              <SiGnuprivacyguard className="h-10 w-10 text-white" />
            )}
          </div>
          <Typography variant="h5" color="white">
            Task Manager
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab value="login" onClick={() => setType("login")}>
                Log In
              </Tab>
              <Tab value="signup" onClick={() => setType("signup")}>
                Sign Up
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-hidden"
              animate={{
                initial: {
                  x: type === "login" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "login" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="login" className="p-0">
                <form
                  onSubmit={handleSubmit}
                  className="mt-12 flex flex-col gap-4"
                >
                  <div>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      Login Details
                    </Typography>
                    <hr />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium mt-8"
                    >
                      Username
                    </Typography>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      type="text"
                      name="username"
                      placeholder="john doe"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {errors.username && touched.username && (
                      <p className="text-red-500 text-xs">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Password
                    </Typography>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      name="password"
                      type="password"
                      placeholder="nobodyknows76"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                  </div>
                  <Button type="submit" size="lg">
                    Log In
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <SiGnuprivacyguard className="-mt-0.5 h-4 w-4" /> Create
                    Account
                  </Typography>
                </form>
              </TabPanel>
              {/* Signup Form component */}
              <Signup setType={setType}/>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
