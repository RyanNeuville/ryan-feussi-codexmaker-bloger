module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
        search: "",
      },
      new URL('https://e7.pngegg.com/**')
    ],
  },
};
