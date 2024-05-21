import { FaFaucetDrip } from "react-icons/fa6";
import { MdCastForEducation } from "react-icons/md";


export default function Categories () {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Select from a popular category</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-8 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
          <div className="relative overflow-hidden transition-all duration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
            <div className="p-6 lg:px-10 lg:py-8">
              <div className="flex items-center justify-start space-x-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
              </svg>
                <div className="flex-shrink-0 w-px h-12 bg-gray-200"></div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                    <a href="#" title="">
                      Construction
                      <span className="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-500">983 Businesses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden transition-all duration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
            <div className="p-6 lg:px-10 lg:py-8">
              <div className="flex items-center justify-start space-x-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
                <div className="flex-shrink-0 w-px h-12 bg-gray-200"></div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                    <a href="#" title="">
                      Finance & Investing
                      <span className="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-500">142 Businesses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden transition-all duration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
            <div className="p-6 lg:px-10 lg:py-8">
              <div className="flex items-center justify-start space-x-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>
                <div className="flex-shrink-0 w-px h-12 bg-gray-200"></div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                    <a href="#" title="">
                      Software
                      <span className="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-500">476 Businesses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden transition-all duration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
            <div className="p-6 lg:px-10 lg:py-8">
              <div className="flex items-center justify-start space-x-8">
                <svg className="flex-shrink-0 w-10 h-10 text-gray-600 md:w-12 md:h-12" viewBox="0 0 60 60" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 18L24 11L26 8H34L36 11L30 18Z" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M30 52C39.3888 52 47 44.3888 47 35C47 25.6112 39.3888 18 30 18C20.6112 18 13 25.6112 13 35C13 44.3888 20.6112 52 30 52Z" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M30 47C36.6274 47 42 41.6274 42 35C42 28.3726 36.6274 23 30 23C23.3726 23 18 28.3726 18 35C18 41.6274 23.3726 47 30 47Z" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className="flex-shrink-0 w-px h-12 bg-gray-200"></div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                    <a href="#" title="">
                      Jewelry
                      <span className="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-500">849 Businesses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden transition-all duration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
            <div className="p-6 lg:px-10 lg:py-8">
              <div className="flex items-center justify-start space-x-8">
                <FaFaucetDrip className="h-12 w-12" />
                <div className="flex-shrink-0 w-px h-12 bg-gray-200"></div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                    <a href="#" title="">
                      Plumbing
                      <span className="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-500">253 Businesses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden transition-all duration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
            <div className="p-6 lg:px-10 lg:py-8">
              <div className="flex items-center justify-start space-x-8">
                <MdCastForEducation className="h-12 w-12" />
                <div className="flex-shrink-0 w-px h-12 bg-gray-200"></div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                    <a href="#" title="">
                      Online Education
                      <span className="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-500">94 Businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}