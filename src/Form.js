import React from "react"
// import Ant design Components
import { Form, Input, Button, Select, Checkbox } from "antd"
import { useState, useEffect } from "react"

function MyForm() {
   const [data, setData] = useState([])
   const [form] = Form.useForm()
   const [, forceUpdate] = useState({})

   // Fetching data from api
   function fetchData() {
      fetch("https://cat-fact.herokuapp.com/facts")
         .then((response) => response.json())
         .then((data) => setData([data]))
   }
   useEffect(() => {
      forceUpdate({})
   }, [])

   return (
      <div className="form_container">
         <Form
            onSubmitCapture={fetchData}
            form={form}
            autoComplete="on"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
         >
            <Form.Item
               name="fullName"
               label="Full Name"
               rules={[
                  {
                     required: true,
                     message: "Please enter your name",
                  },
               ]}
               hasFeedback
            >
               <Input placeholder="Type your name" />
            </Form.Item>

            <Form.Item
               name="email"
               label="Email"
               rules={[
                  {
                     required: true,
                     message: "Please enter your email",
                  },
                  { type: "email", message: "Please enter a valid email" },
               ]}
               hasFeedback
            >
               <Input placeholder="Type your email" />
            </Form.Item>

            <Form.Item
               name="gender"
               label="Gender"
               requiredmark="optional"
               hasFeedback
            >
               <Select placeholder="Select your gender">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
               </Select>
            </Form.Item>

            <Form.Item
               name="password"
               label="Password"
               rules={[
                  {
                     required: true,
                  },
                  { min: 6 },
               ]}
               hasFeedback
            >
               <Input.Password placeholder="Type your password" />
            </Form.Item>

            <Form.Item
               name="confirmPassword"
               label="Confirm Password"
               dependencies={["password"]}
               rules={[
                  {
                     required: true,
                  },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                           return Promise.resolve()
                        }
                        return Promise.reject(
                           "The two passwords that you entered does not match."
                        )
                     },
                  }),
               ]}
               hasFeedback
            >
               <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item
               name="agreement"
               wrapperCol={{ span: 24 }}
               valuePropName="checked"
               rules={[
                  {
                     validator: (_, value) =>
                        value
                           ? Promise.resolve()
                           : Promise.reject(
                                "To proceed, you need to agree with our terms and conditions"
                             ),
                  },
               ]}
            >
               <Checkbox>
                  Agree to our <a href="#home">Terms and Conditions</a>
               </Checkbox>
            </Form.Item>

            <Form.Item shouldUpdate>
               {() => (
                  <Button
                     type="primary"
                     htmlType="submit"
                     disabled={
                        !form.isFieldsTouched(true) ||
                        !!form
                           .getFieldsError()
                           .filter(({ errors }) => errors.length).length
                     }
                  >
                     Register
                  </Button>
               )}
            </Form.Item>
         </Form>
         <div>
             {/* display data  */}
            {data.map((info, index) => {
               return (
                  <div className="data_text" key={index}>
                     <p>{info[0].type}</p>
                     <p>{info[0].text}</p>
                     <p>{info[1].text}</p>
                     <p>{info[2].text}</p>
                     <p>{info[3].text}</p>
                     <p>{info[4].text}</p>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default MyForm
