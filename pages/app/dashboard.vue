<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <div class="max-w-5xl mx-auto px-4 py-12">
      <!-- Greeting & Group -->
      <div class="mb-8" v-if="profile">
        <h1 class="text-3xl font-bold mb-2">
          Welcome back, {{ profile.first_name }} 👋
        </h1>
        <p class="text-lg">
          Group:
          <span class="font-medium text-yellow-600">{{ group.name }}</span>
          <div v-if="group.name == 'No group assigned'" class="flex space-x-4 mt-4">
            <NuxtLink to="/app/create-group">
              <button
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Create a Group
              </button>
            </NuxtLink>
            <NuxtLink to="/app/join-group">
              <button
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Join a Group
              </button>
            </NuxtLink>
          </div>
        </p>
      </div>

      <section v-if="group.name == 'No group assigned'">
        <p>
          You are not currently a member of any group.
        </p>
      </section>

      <section v-if="group.name != 'No group assigned'">
      <!-- Tabs -->
      
      <div class="flex space-x-4 mb-6 border-b">
        <button
          @click="activeTab = 'games'"
          :class="[
            'pb-2 px-4 font-medium',
            activeTab === 'games'
              ? 'border-b-2 border-yellow-500 text-yellow-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          Games
        </button>
        <button
          @click="activeTab = 'leaderboard'"
          :class="[
            'pb-2 px-4 font-medium',
            activeTab === 'leaderboard'
              ? 'border-b-2 border-yellow-500 text-yellow-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          Leaderboard
        </button>

        <button
          @click="activeTab = 'group'"
          :class="[
            'pb-2 px-4 font-medium',
            activeTab === 'group'
              ? 'border-b-2 border-yellow-500 text-yellow-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          Group
        </button>
      </div>

      <!-- Tab Content -->
      <div
        v-if="activeTab === 'games'"
        class="bg-white shadow rounded-lg p-6 mb-8"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold">Games Logged</h2>
          <NuxtLink to="/app/log-game">
            <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition text-sm">
              + Log New Game
            </button>
          </NuxtLink>
        </div>

        <div v-if="gamesLoading" class="py-8 text-center text-gray-500">
          <p>Loading games...</p>
        </div>
        
        <div v-else-if="games.length" class="grid gap-6 md:grid-cols-2">
          <div
            v-for="game in games"
            :key="game.id"
            class="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <!-- Game Header -->
            <div class="bg-orange-100 border-b border-yellow-100 p-4">
              <h3 class="text-xl font-bold text-gray-800 mb-1">{{ game.name || 'Unnamed Game' }}</h3>
              <div class="flex items-center text-sm text-gray-600">
                <span class="inline-block">
                  <CalendarIcon class="w-4 h-4 inline mr-1" />
                  {{ formatDate(game.game_date) }}
                </span>
              </div>
            </div>
            
            <!-- Game Details -->
            <div class="p-4">
              <!-- Player Results -->
              <div class="mb-3">
                <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Players</h4>
                <ul v-if="game.playerDetails && game.playerDetails.length > 0" class="space-y-1 mb-2">
                  <li v-for="player in game.playerDetails" :key="player.id" class="flex items-center">
                    <div 
                      class="w-3 h-3 rounded-full mr-2" 
                      :style="`background-color: ${player.colour}; ${player.colour === '#ffffff' ? 'border: 1px solid #000000;' : ''}`"
                    ></div>
                    <span class="font-medium">{{ player.name }}</span>
                    <span class="ml-auto font-semibold">{{ player.score }} pts</span>
                    <span v-if="isWinner(game, player)" class="ml-2 text-yellow-500">👑</span>
                  </li>
                </ul>
                <p v-else class="text-gray-500 text-sm italic">No player details available</p>
              </div>
              
              <!-- Expansions -->
              <div>
                <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Expansions</h4>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="expansion in game.expansions"
                    :key="expansion"
                    class="bg-green-50 text-green-700 text-xs px-2 py-1 rounded"
                  >
                    {{ expansion }}
                  </span>
                  <span v-if="!game.expansions || game.expansions.length === 0" class="text-gray-400 text-sm">
                    Base game only
                  </span>
                </div>
              </div>
            </div>
            
            <!-- View Details Link -->
            <div class="bg-gray-50 p-3 text-right border-t">
              <NuxtLink
                :to="`/app/view-game?id=${game.id}`"
                class="text-yellow-600 hover:text-yellow-700 text-sm font-medium hover:underline"
              >
                View Details →
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="py-8 text-center text-gray-500 border border-dashed rounded-lg">
          <p class="mb-4">No games logged yet.</p>
          <NuxtLink to="/app/log-game">
            <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition">
              Log Your First Game
            </button>
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="activeTab === 'leaderboard'"
        class="bg-white shadow rounded-lg p-6 mb-8"
      >
        <h2 class="text-2xl font-semibold mb-4">Leaderboard</h2>
        
        <div v-if="calculatedLeaderboard.length === 0" class="text-center py-8 text-gray-500">
          <p>Loading leaderboard data...</p>
        </div>
        
        <div v-else class="overflow-x-auto -mx-6 px-6">
          <div class="inline-block min-w-full align-middle">
            <table class="min-w-full divide-y divide-gray-200 border-collapse">
              <thead>
                <tr class="border-b">
                  <th scope="col" class="py-3 pl-3 pr-3 text-left text-sm font-semibold">Player</th>
                  <th scope="col" class="py-3 px-3 text-center text-sm font-semibold whitespace-nowrap">Games Played</th>
                  <th scope="col" class="py-3 px-3 text-center text-sm font-semibold whitespace-nowrap">Games Won</th>
                  <th scope="col" class="py-3 px-3 text-center text-sm font-semibold whitespace-nowrap">Win %</th>
                  <th scope="col" class="py-3 px-3 text-center text-sm font-semibold whitespace-nowrap">Total Points</th>
                  <th scope="col" class="py-3 px-3 text-center text-sm font-semibold whitespace-nowrap">Pts/Game</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="(player, index) in calculatedLeaderboard"
                  :key="index"
                  :class="[
                    'border-b hover:bg-gray-50',
                    index === 0 ? 'bg-orange-100 font-semibold ring-2 ring-yellow-400' : ''
                  ]"
                >
                  <td class="py-3 pl-3 pr-3 text-sm whitespace-nowrap">
                    <div class="flex items-center">
                      <span class="font-medium">{{ player.name }}</span>
                      <span v-if="index === 0" class="ml-1 text-yellow-600">👑</span>
                      <span v-if="index === 0" class="ml-2 text-xs px-2 py-0.5 bg-yellow-500 text-white rounded-full whitespace-nowrap">Champion</span>
                    </div>
                  </td>
                  <td class="py-3 px-3 text-sm text-center whitespace-nowrap">{{ player.gamesPlayed }}</td>
                  <td class="py-3 px-3 text-sm text-center whitespace-nowrap">{{ player.gamesWon }}</td>
                  <td class="py-3 px-3 text-sm text-center whitespace-nowrap">{{ player.gamesPlayed > 0 ? Math.round(player.gamesWon / player.gamesPlayed * 100) + '%' : '0%' }}</td>
                  <td class="py-3 px-3 text-sm text-center whitespace-nowrap">{{ player.points }}</td>
                  <td class="py-3 px-3 text-sm text-center whitespace-nowrap">{{ player.pointsPerGame }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        v-if="activeTab === 'group'"
        class="bg-white shadow rounded-lg p-6 mb-8"
      >
        <h2 class="text-2xl font-semibold mb-4">Group</h2>
        <div class="mb-6">
          <p class="mb-2">
            <span class="font-semibold">Group Name:</span> {{ group.name }}
          </p>
          <p>
            <span class="font-semibold">Group Code:</span> {{ group.code }}
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Group Members</h3>
          <div v-if="groupMembers.length === 0" class="py-4 text-center text-gray-500">
            <p>Loading group members...</p>
          </div>
          <ul v-else class="divide-y divide-gray-200">
            <li v-for="member in groupMembers" :key="member.id" class="py-3 flex items-center">
              <div class="text-yellow-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p class="font-medium">{{ member.first_name }} {{ member.last_name }}</p>
                <p v-if="member.user === authUser.id" class="text-xs text-gray-500">(You)</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: "application",
});
import { ref, computed, watch } from "vue";
import { h, defineComponent } from "vue";

const supabase = useSupabaseClient();
const authUser = useSupabaseUser();
const profile = ref(null);
const loading = ref(true);
const gamesLoading = ref(true);
const group = ref({ name: "No group assigned" });
const games = ref([]);
const groupMembers = ref([]);

const activeTab = ref("games");
const calculatedLeaderboard = ref([]);

// Function to format date
function formatDate(dateString) {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Function to determine if a player is the winner
function isWinner(game, player) {
  if (!game.playerDetails || game.playerDetails.length === 0) return false;
  
  // Find the player with the highest score
  const highestScore = Math.max(...game.playerDetails.map(p => p.score));
  return player.score === highestScore;
}

onMounted(async () => {
  if (!authUser.value) return;

  const { data: profileData, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user", authUser.value.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
  } else {
    profile.value = profileData;
  }

  // Check if the user has a group
  if (profile.value && profile.value.group) {
    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .select("*")
      .eq("id", profile.value.group)
      .single();

    if (groupError) {
      console.error("Error fetching group:", groupError.message);
    } else {
      group.value = groupData;
    }
    
    // Fetch games with player details
    await fetchGames();
    
    // Also calculate the leaderboard 
    await calculateLeaderboard();
    
    // And fetch group members
    await fetchGroupMembers();
  } else {
    console.log("User does not have a group.");
    group.value = { name: "No group assigned" }; // Default message or object
    gamesLoading.value = false;
  }

  loading.value = false;
});

async function fetchGames() {
  gamesLoading.value = true;
  
  try {
    // Fetch basic game data
    const { data: gameData, error: gameError } = await supabase
      .from("games")
      .select("*")
      .eq("group_id", profile.value.group)
      .order('created_at', { ascending: false });

    if (gameError) {
      console.error("Error fetching games:", gameError.message);
      games.value = [];
      return;
    }
    
    console.log("Game data:", gameData); // Debug
    
    // For each game, fetch the player details
    const gamesWithDetails = await Promise.all(
      gameData.map(async (game) => {
        // Get player links
        const { data: linkData, error: linkError } = await supabase
          .from("games_users_link")
          .select("*")
          .eq("game_id", game.id);
          
        if (linkError) {
          console.error(`Error fetching player links for game ${game.id}:`, linkError.message);
          return { ...game, playerDetails: [] };
        }
        
        console.log(`Player links for game ${game.id}:`, linkData); // Debug
        if (linkData.length === 0) {
          console.log(`No player links found for game ${game.id} - this is unusual`);
        }

        // For debugging - check the column names in the link data
        if (linkData.length > 0) {
          console.log("Sample link data with columns:", linkData[0]);
        }
        
        // Get player profiles for each link
        const playerDetails = await Promise.all(
          linkData.map(async (link) => {
            // Use correct column name - user_id instead of users_id
            const { data: userData, error: userError } = await supabase
              .from("user_profiles")
              .select("first_name, last_name")
              .eq("user", link.user_id)
              .single();
              
            if (userError) {
              console.error(`Error fetching user ${link.user_id}:`, userError.message);
              return { 
                id: link.id,
                colour: link.colour,
                score: link.score,
                name: "Unknown Player"
              };
            }
            
            return {
              id: link.id,
              colour: link.colour,
              score: link.score,
              name: `${userData.first_name} ${userData.last_name}`
            };
          })
        );
        
        return { ...game, playerDetails };
      })
    );
    
    games.value = gamesWithDetails;
    console.log("Games with details:", games.value); // Debug
  } catch (error) {
    console.error("Error in fetchGames:", error);
    games.value = [];
  } finally {
    gamesLoading.value = false;
  }
}

// Function to calculate the leaderboard data
async function calculateLeaderboard() {
  if (!profile.value || !profile.value.group) return;
  
  try {
    // First get all users in the group
    const { data: groupUsers, error: userError } = await supabase
      .from("user_profiles")
      .select("id, user, first_name, last_name")
      .eq("group", profile.value.group);
      
    if (userError) {
      console.error("Error fetching group users:", userError.message);
      return;
    }
    
    // Get all games for this group
    const { data: allGames, error: gamesError } = await supabase
      .from("games")
      .select("id")
      .eq("group_id", profile.value.group);
      
    if (gamesError) {
      console.error("Error fetching games for leaderboard:", gamesError.message);
      return;
    }
    
    // Get all game results for this group's games
    const { data: allResults, error: resultsError } = await supabase
      .from("games_users_link")
      .select("*")
      .in("game_id", allGames.map(game => game.id));
      
    if (resultsError) {
      console.error("Error fetching game results:", resultsError.message);
      return;
    }
    
    console.log("Group users:", groupUsers);
    console.log("All games:", allGames);
    console.log("All results:", allResults);
    
    // Calculate stats for each user
    const leaderboardData = groupUsers.map(user => {
      // Find all results for this user
      const userResults = allResults.filter(result => result.user_id === user.user);
      
      // Calculate total games played
      const gamesPlayed = userResults.length;
      
      // Calculate total points
      const totalPoints = userResults.reduce((sum, result) => sum + (result.score || 0), 0);
      
      // Calculate games won
      const gamesWon = userResults.filter(result => {
        // Get all results for this game
        const gameResults = allResults.filter(gr => gr.game_id === result.game_id);
        // Check if this user had the highest score
        return result.score >= Math.max(...gameResults.map(gr => gr.score || 0));
      }).length;
      
      return {
        name: `${user.first_name} ${user.last_name}`,
        gamesPlayed,
        gamesWon,
        points: totalPoints,
        user_id: user.user,
        pointsPerGame: gamesPlayed > 0 ? Math.round(totalPoints / gamesPlayed * 10) / 10 : 0
      };
    });
    
    // Sort by total points (descending)
    leaderboardData.sort((a, b) => b.points - a.points);
    
    calculatedLeaderboard.value = leaderboardData;
    console.log("Calculated leaderboard:", calculatedLeaderboard.value);
  } catch (error) {
    console.error("Error calculating leaderboard:", error);
  }
}

// Update the leaderboard when the activeTab changes to 'leaderboard'
watch(activeTab, async (newTab) => {
  if (newTab === 'leaderboard' && calculatedLeaderboard.value.length === 0) {
    await calculateLeaderboard();
  }
  
  if (newTab === 'group' && groupMembers.value.length === 0) {
    await fetchGroupMembers();
  }
});

// Fetch all members of the current group
async function fetchGroupMembers() {
  if (!profile.value || !profile.value.group) return;
  
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("group", profile.value.group)
      .order('first_name', { ascending: true });
      
    if (error) {
      console.error("Error fetching group members:", error.message);
    } else {
      groupMembers.value = data || [];
      console.log("Group members:", groupMembers.value);
    }
  } catch (error) {
    console.error("Error in fetchGroupMembers:", error);
  }
}

// Calendar icon component
const CalendarIcon = defineComponent({
  render() {
    return h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor',
      class: this.$attrs.class || 'w-5 h-5'
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      })
    ]);
  }
});
</script>

