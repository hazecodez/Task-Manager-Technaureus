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

export default function CheckoutForm() {
  const [type, setType] = useState("login");

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
                <form className="mt-12 flex flex-col gap-4">
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
                      type="text"
                      placeholder="john doe"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
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
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <Button size="lg">Log In</Button>
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
              <TabPanel value="signup" className="p-0">
                <form className="mt-12 flex flex-col gap-4">
                  <div>
                    <div className="md:flex md:flex-row md:justify-between">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          First Name
                        </Typography>
                        <Input
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Last Name
                        </Typography>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          name="last_name"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Email
                    </Typography>
                    <Input
                      type="email"
                      placeholder="name@mail.com"
                      name="email"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Username
                    </Typography>
                    <Input
                      type="text"
                      name="username"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <div className="md:flex md:flex-row md:justify-between">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Password
                        </Typography>
                        <Input
                          type="password"
                          name="password"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Confirm Password
                        </Typography>
                        <Input
                          type="password"
                          name="confirm_password"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <Button size="lg">Register</Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
