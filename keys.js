// Test
// console.log('this is loaded');

// Export sensitive data
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  APIKey: process.env.OMDB_API
}