import { Button, TabPanel, Typography, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { SignupSchema } from "../Validations/LoginSchema";
import { userRegister } from "../Services/Apis";
import { toast } from "sonner";
import PropTypes from "prop-types";

export default function Signup({setType}) {

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: SignupSchema,
      onSubmit: Submission,
    });

  async function Submission(formData) {
    try {
      const response = await userRegister(formData);
      if (response?.data.user) {
        toast.success(response?.data.message);
        setType("login")
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TabPanel value="signup" className="p-0">
      <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
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
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="first_name"
                placeholder="First Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.first_name && touched.first_name && (
                <p className="text-red-500 text-xs">{errors.first_name}</p>
              )}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                type="text"
                placeholder="Last Name"
                name="last_name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.last_name && touched.last_name && (
                <p className="text-red-500 text-xs">{errors.last_name}</p>
              )}
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
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            placeholder="name@mail.com"
            name="email"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-medium"
          >
            Username
          </Typography>
          <Input
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="username"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.username && touched.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )}
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
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                name="password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
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
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                name="confirm_password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.confirm_password && touched.confirm_password && (
                <p className="text-red-500 text-xs">
                  {errors.confirm_password}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" size="lg">
          Register
        </Button>
      </form>
    </TabPanel>
  );
}


Signup.propTypes = {
  setType: PropTypes.func.isRequired
}