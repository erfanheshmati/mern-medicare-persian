export default function Contact() {
    return (
        <section>
            <div className="px-4 mx-auto max-w-screen-md">
                <h2 className="heading text-center">
                    فرم تماس
                </h2>
                <p className="text__para mb-8 lg:mb-16 font-light text-center">
                    در جهت بهبود عملکرد وب سایت نظرات خود را برای ما ارسال کنید.
                </p>
                <form className="space-y-8">
                    <div>
                        <label htmlFor="email" className="form__label dark:text-slate-300">
                            ایمیل *
                        </label>
                        <input type="email" id="email" className="form__input mt-1" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="form__label dark:text-slate-300">
                            موضوع *
                        </label>
                        <input type="text" id="subject" className="form__input mt-1" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="form__label dark:text-slate-300">
                            پیام *
                        </label>
                        <textarea rows={5} id="message" className="form__input mt-1" required />
                    </div>
                    <button type="submit" className="btn rounded-lg sm:w-fit">
                        ارسال
                    </button>
                </form>
            </div>
        </section>
    )
}
