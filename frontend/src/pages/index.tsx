import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Moss Discgolf Klubb - Bag Tag System</title>
        <meta name="description" content="Bag tag tracking system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🏆 Moss Discgolf Klubb</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-8">Bag Tag System</h2>
          <p className="text-gray-500 mb-8">Loading...</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">🏅 Leaderboard</h3>
              <p className="text-gray-600">Track player rankings</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Statistics</h3>
              <p className="text-gray-600">View detailed stats</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 Bag Tags</h3>
              <p className="text-gray-600">Manage achievements</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
