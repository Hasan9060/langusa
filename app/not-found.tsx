import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <section className="pt-20 pb-32 text-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Illustration Image */}
        <div className="mb-8 animate__animated animate__fadeIn">
          <Image
            src="/Images/error2.png"
            alt="404 Error Illustration"
            width={500}
            height={400}
            className="mx-auto"
            priority
          />
        </div>

        {/* Error Text */}
        <h1 className="text-4xl text-green-500 font-bold animate__animated animate__fadeIn" data-wow-delay=".2s">
          Error 404
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 animate__animated animate__fadeIn" data-wow-delay=".3s">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mb-8 animate__animated animate__fadeIn" data-wow-delay=".4s">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 animate__animated animate__fadeIn"
          data-wow-delay=".5s"
        >
          <Link
            href="/"
            className="py-3 px-6 bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-600 transition-all"
          >
            Go back to Homepage
          </Link>
          <Link
            href="/contact"
            className="py-3 px-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Custom404;
