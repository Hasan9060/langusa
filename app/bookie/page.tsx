import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const featuredClasses = [
    { id: 1, name: 'Class 1', bookCount: 15, color: 'bg-blue-100' },
    { id: 2, name: 'Class 2', bookCount: 18, color: 'bg-green-100' },
    { id: 3, name: 'Class 3', bookCount: 22, color: 'bg-yellow-100' },
    { id: 4, name: 'Class 4', bookCount: 16, color: 'bg-purple-100' },
    { id: 5, name: 'Class 5', bookCount: 20, color: 'bg-pink-100' },
    { id: 6, name: 'Class 6', bookCount: 25, color: 'bg-indigo-100' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Ebooks Library - Home</title>
        <meta name="description" content="Access educational ebooks and resources" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Digital Ebooks Library</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Access thousands of educational resources and textbooks for all classes
          </p>
          <Link href="/classes">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300">
              Browse Classes
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Available Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredClasses.map((classItem) => (
              <Link key={classItem.id} href={`/classes/${classItem.id}`}>
                <div className={`${classItem.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 cursor-pointer transform hover:-translate-y-1`}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{classItem.name}</h3>
                  <p className="text-gray-600 mb-4">{classItem.bookCount} books available</p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span>View Books</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Ebooks?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Collection</h3>
              <p className="text-gray-600">Access a wide range of textbooks and educational materials for all classes and subjects.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Resources</h3>
              <p className="text-gray-600">All materials are verified and approved by educational authorities and experts.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Access</h3>
              <p className="text-gray-600">Download or read online from any device, anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}