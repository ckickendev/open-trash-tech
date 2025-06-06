import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REACT_APP_ROOT_BACKEND, signUpSchema } from "./authentication";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/hook/useTranslation";

type SignUpInputs = {
    email: string,
    username: string;
    password: string;
    repassword: string;
};

type ModalAuthen = {
    setAuthenState: any,
    setIsLoading: any,
    setIsAuthenFromDisplay: any
};

export const SignUp = ({ setAuthenState, setIsLoading, setIsAuthenFromDisplay }: ModalAuthen) => {
    const { t } = useTranslation();

    const ROOT_BACKEND = REACT_APP_ROOT_BACKEND;
    const [errorSv, setErrorSv] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInputs>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpInputs, event: any) => {
        setIsLoading(true);
        event.preventDefault();
        try {
            const res = await axios.post(`${ROOT_BACKEND}/auth/register`, data);
            localStorage.setItem("user_signup", res.data.user);
            setIsLoading(false);
            setAuthenState(3);
            return;
        }
        catch (err: any) {
            setErrorSv(err?.response?.data?.error || err?.message);
            setIsLoading(false);
        }
    };

    return (
        <>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal" onClick={() => setIsAuthenFromDisplay(0)}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                {/* <span className="sr-only">Close modal</span> */}
            </button>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <Image src="/logo.png" alt="open-idear" width={152} height={100} />
                    </div>
                    {/* <h1 className="text-2xl font-semibold text-blue-600 flex items-center justify-center">
                        <span className="text-3xl font-bold">Open</span>
                        Trash
                    </h1> */}
                    <p className="text-gray-500 text-sm mt-1">
                        {t("component.authen.signUp.des")}
                    </p>
                </div>

                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {t("component.authen.signUp.title")}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                {t("component.authen.signUp.email")}
                            </label>
                            <div className="mt-1">
                                <input id="email" type="email" autoComplete="email" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("component.authen.signUp.email_placeholder")}
                                    {...register("email")} />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                {t("component.authen.signUp.username_placeholder")}
                            </label>
                            <div className="mt-1">
                                <input id="username" type="text" autoComplete="username" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("component.authen.signUp.email_placeholder")}
                                    {...register("username")} />
                                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                {t("component.authen.signUp.password")}
                            </label>
                            <div className="mt-1">
                                <input id="password" type="password" autoComplete="current-password" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("component.authen.signUp.password_placeholder")}
                                    {...register("password")} />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="re-password" className="block text-sm font-medium text-gray-700">
                                {t("component.authen.signUp.confirm_password")}
                            </label>
                            <div className="mt-1">
                                <input id="re-password" type="password" autoComplete="re-password" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("component.authen.signUp.confirm_password_placeholder")}
                                    {...register("repassword")} />
                            </div>
                        </div>
                        {errorSv && <p className="text-red-500">{errorSv}</p>}
                        <div>
                            <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {t("component.authen.signUp.su")}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="mt-4 text-center">
                            <p className="text-gray-500 text-sm">
                                {t("component.authen.signUp.have_account")}
                                <span onClick={() => setAuthenState(1)} className="text-blue-500 font-medium hover:underline cursor-pointer">{t("component.authen.signUp.lg_now")}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}