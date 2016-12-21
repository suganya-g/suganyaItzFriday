module.exports = {
	mongoURL: process.env.MONGO_URL || 'mongodb://db/gitbotDB',
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '7ad83241674f102bf2dd',
  	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || 'd0f32ac00278b1829759179d417e0c323de823b5',
  	USER_AGENT: process.env.USER_AGENT || 'git-bot'
}