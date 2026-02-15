"use client";
import LoginSchema from "@/schema/loginValidation";
import { Mail } from "lucide-react";
import z from "zod";
import { useAppForm } from "../form/hooks";
import { Button } from "../ui/button";
import { FieldGroup } from "../ui/field";
type FormData = z.infer<typeof LoginSchema>;
const LoginForm = () => {
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    } satisfies FormData as FormData,
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async (values) => {
      // Handle form submission, e.g., call an API to authenticate the user
      console.log("Form submitted with values:", values);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField name="email">
          {(field) => (
            <field.InputWithIcon
              label="Email"
              placeholder="johndoe@example.com"
              type="email"
              icon={Mail}
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => <field.PasswordInput />}
        </form.AppField>
        <Button type="submit">Sign In</Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;

//    <div className="space-y-6">
//       {/* Email Field */}
//       <div className="space-y-2">
//         <Label htmlFor="email">Email address</Label>
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <Input
//             id="email"
//             type="email"
//             placeholder="name@example.com"
//             className="pl-10 h-11"
//           />
//         </div>
//       </div>

//       {/* Password Field */}
//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <Label htmlFor="password">Password</Label>
//           <Link
//             href="/forgot-password"
//             className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
//           >
//             Forgot password?
//           </Link>
//         </div>
//         <div className="relative">
//           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <Input
//             id="password"
//             type="password"
//             placeholder="Enter your password"
//             className="pl-10 h-11"
//           />
//         </div>
//       </div>

//       {/* Remember Me */}
//       <div className="flex items-center space-x-2">
//         <Checkbox id="remember" />
//         <Label
//           htmlFor="remember"
//           className="text-sm font-normal text-gray-600 cursor-pointer"
//         >
//           Remember me for 30 days
//         </Label>
//       </div>

//       {/* Sign In Button */}
//       <Button className="w-full h-11 text-base font-semibold bg-blue-600 hover:bg-blue-700">
//         Sign in
//       </Button>
//     </div>
