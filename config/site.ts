export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Geomap Planner",
	description: "Planning your mission on geographic map.",
	navItems: [
		{
			label: "Missions",
			href: "/",
		},
		{
		label: "About",
		href: "/about",
		}
		],
	navMenuItems: [
		{
			label: "Missions",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
	],
	links: {
		github: "https://github.com/shluf/geomap-planner",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
