<template>
  <!-- Hero Section -->
  <section
    class="relative text-center py-32 px-6 bg-cover bg-center h-[600px] flex items-center justify-center"
    style="background-image: url('/images/home-hero-img.jpeg')"
  >
    <div class="absolute inset-0 bg-black opacity-60"></div>
    <div class="relative z-10 max-w-3xl mx-auto">
      <h2 class="text-5xl font-extrabold mb-4 text-white">
        Track Your Catan Games
      </h2>
      <p class="text-lg max-w-xl mx-auto text-gray-200 mb-8">
        Longest Road is the easiest way to log games, track wins, and compete
        with your friends across all your Catan groups.
      </p>
      <a
        href="/auth/register"
        class="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-lg text-lg font-medium transition inline-block shadow-lg"
      >
        Get Started
      </a>
    </div>
  </section>

  <!-- Features Section -->
  <section
    class="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
  >
    <div
      class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
    >
      <div class="inline-block bg-yellow-100 p-4 rounded-full mb-4">
        <span class="text-3xl">🧑‍🤝‍🧑</span>
      </div>
      <h3 class="text-xl font-bold text-yellow-600 mb-3">Groups</h3>
      <p class="text-gray-600">
        Create a group for your friends or game night crew. Share a join code
        and start logging games together.
      </p>
    </div>
    <div
      class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
    >
      <div class="inline-block bg-yellow-100 p-4 rounded-full mb-4">
        <span class="text-3xl">📅</span>
      </div>
      <h3 class="text-xl font-bold text-yellow-600 mb-3">Game Logging</h3>
      <p class="text-gray-600">
        Track each game's date, expansions used, players, and scores. Stay
        organized and never forget who won.
      </p>
    </div>
    <div
      class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
    >
      <div class="inline-block bg-yellow-100 p-4 rounded-full mb-4">
        <span class="text-3xl">🏆</span>
      </div>
      <h3 class="text-xl font-bold text-yellow-600 mb-3">Leaderboard</h3>
      <p class="text-gray-600">
        See who's dominating your Catan sessions with live win tallies and
        performance stats.
      </p>
    </div>
  </section>

  <!-- Call to Action -->
  <section
    class="bg-gradient-to-r from-yellow-500 to-red-500 py-20 text-center text-white"
  >
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-4">Ready to take the longest road?</h2>
      <p class="mt-2 text-white text-lg opacity-90 mb-8">
        Start tracking your Catan journey today.
      </p>
      <a
        href="/auth/register"
        class="bg-white text-yellow-700 hover:bg-gray-100 py-3 px-8 rounded-lg text-lg font-medium transition inline-block shadow-lg"
      >
        Register Now
      </a>
    </div>
  </section>
</template>
