/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yourdomain.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/404', '/500', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://yourdomain.com/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/500', '/api/*']
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = 0.7
    if (path === '/') {
      priority = 1.0
    } else if (path.startsWith('/projects/')) {
      priority = 0.8
    } else if (path === '/about' || path === '/contact') {
      priority = 0.9
    }

    // Custom change frequency
    let changefreq = 'weekly'
    if (path === '/') {
      changefreq = 'daily'
    } else if (path.startsWith('/projects/')) {
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
} 