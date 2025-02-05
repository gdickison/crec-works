/* eslint-disable @next/next/no-img-element */
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {

  return (
    <div>
      <section>
        <div
          className="relative grid h-screen grid-cols-1 items-stretch justify-center overflow-auto lg:grid-cols-2"
        >
          <div
            className="relative mx-[5vw] flex items-center justify-center pb-16 pt-20 md:pb-20 md:pt-24 lg:py-20"
          >
            <div className="container max-w-sm">
              <SignIn />
            </div>
          </div>
          <div className="hidden bg-background-secondary lg:block">
            <img
              src="/images/hat_store_sm.jpg"
              alt="Relume placeholder image"
              className="h-full w-full object-fit"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
