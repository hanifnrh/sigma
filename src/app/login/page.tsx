// app/login/page.tsx
'use client';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ShineBorder from "@/components/ui/shine-border";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleSubmit = async (data: LoginFormValues) => {
        try {
            const response = await fetch("http://localhost:8000/api/api-token-auth/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem("token", responseData.token);
                }
                router.push("/dashboard");
                toast({
                    title: "Login Successful!",
                    description: "You have been redirected to the dashboard.",
                });
            } else {
                toast({
                    title: "Login Failed",
                    description: responseData.detail || "Invalid username or password.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong during login.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <ShineBorder
                    className="relative flex h-[500px] max-w-6xl max-md:max-w-lg flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                    <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4">
                        <div className="md:max-w-md w-full px-4 py-4">

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
                                    <div className="">
                                        <h3 className="text-gray-800 text-3xl font-extrabold">Masuk</h3>
                                        <p className="text-sm mt-4 text-gray-800">
                                            Belum punya akun?{' '}
                                            <a
                                                href="/register"
                                                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                                            >
                                                Daftar di sini
                                            </a>
                                        </p>
                                    </div>
                                    {/* Username Field */}
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Masukkan username" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Password Field */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Masukkan password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button variant={"blue"} type="submit" className="w-full">
                                        Masuk
                                    </Button>
                                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-3 block text-sm text-gray-800"
                                            >
                                                Ingat saya
                                            </label>
                                        </div>
                                        <div>
                                            <a
                                                href="javascript:void(0);"
                                                className="text-blue-600 font-semibold text-sm hover:underline"
                                            >
                                                Lupa Password?
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </Form>

                        </div>
                        {/* Tambahkan elemen lain jika perlu */}
                        <div className="md:h-full">
                            <img src="/hero.png" className="w-full h-full object-cover rounded-xl" alt="login-image" />
                        </div>
                    </div>
                </ShineBorder>
            </div>

        </div>
    );
}

export default Login;
