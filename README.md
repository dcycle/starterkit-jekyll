Jekyll starterkit
=====

[![CircleCI](https://circleci.com/gh/dcycle/starterkit-jekyll/tree/master.svg?style=svg)](https://circleci.com/gh/dcycle/starterkit-jekyll/tree/master)

Starterkit for a new Jekyll website.

Optimized for GitHub Pages
-----

GitHub pages allows you to serve Jekyll websites with no extra steps. The set-up is as follows:

* This code resides on https://github.com/dcycle/starterkit-jekyll
* In the Pages section of Settings, we told GitHub to deploy the site from the ./docs subdirectory of the master branch. (Although it is possible to deploy from the root of the master or another branch, we recommend using the master branch and the ./docs subdirectory; this allows us to put items not destined for web publishing outside of the ./docs subdirectory.)

HTML _is_ Jekyll (but Jekyll is not HTML)
-----

It is not necessary to use or understand Jekyll to to use this project. Its basic use case is that of a simple HTML website, so you can develop HTML just as you normally would.

If you would like to use Jekyll, please see the "Jekyll" section below.

Landing pages
-----

This system can show landing pages using different templates (we use [Bootstrap Agency](https://startbootstrap.com/previews/agency) and [Bootstrap Freelancer](https://startbootstrap.com/previews/freelancer) with [this change](https://github.com/StartBootstrap/startbootstrap-freelancer/pull/333) as examples). To see how this works, see `./docs/jekyll_landing/_posts`, <http://0.0.0.0:8082/landing-agency/>, and <http://0.0.0.0:8082/landing-freelancer/>.

Continuous integration
-----

Tests can be run on each push, using a continuous integration model as described in [Adding continuous integration (CI) to your workflow
January 20, 2021, Dcycle Blog](https://blog.dcycle.com/blog/2021-01-20/ci/).

Here are some of the things we test for:

* CSS structure
* JavaScript structure
* HTML structure
* Broken links
* Javascript interaction
* Accessibility

Requirements
-----

There are no requirements for development HTML. Docker is required to build Jekyll or if you want to run an Apache server on containers as per the Quickstart method below.

Quickstart
-----

Install Docker then run:

    ./scripts/ci.sh

Let's Encrypt on a server
-----

(This does not apply to local development, only to publicly-accessible servers.)

We will follow the instructions in the following blog post:

* [Letsencrypt HTTPS for Drupal on Docker, October 03, 2017, Dcycle Blog](https://blog.dcycle.com/blog/170a6078/letsencrypt-drupal-docker/)

Here are the exact steps:

* Figure out the IP address of your server, for example 1.2.3.4.
* Make sure your domain name, for example example.com, resolves to 1.2.3.4. You can test this by running:

    ping example.com

You should see something like:

    PING example.com (1.2.3.4): 56 data bytes
    64 bytes from 1.2.3.4: icmp_seq=0 ttl=46 time=28.269 ms
    64 bytes from 1.2.3.4: icmp_seq=1 ttl=46 time=25.238 ms

Press control-C to get out of the loop.

* Run your instance (./scripts/deploy.sh)

Now set up Let's Encrypt as per the above blog posts:

    DOMAIN=example.com
    ./scripts/destroy.sh
    ./scripts/build-static-site.sh

    source ./config/versioned

    docker network ls | grep "$DOCKERNETWORK" || docker network create "$DOCKERNETWORK"
    docker run --rm -d \
      -e "VIRTUAL_HOST=$DOMAIN" \
      -e "LETSENCRYPT_HOST=$DOMAIN" \
      -e "LETSENCRYPT_EMAIL=my-email@$DOMAIN" \
      --expose 80 \
      --name "$DOCKERNAME" \
      --network "$DOCKERNETWORK" \
      -p "$DOCKERPORT":80 -v "$PWD/docs/_site":/usr/share/nginx/html:ro nginx:alpine

If this is the first site you have on the server which uses this technique, you need to set up LetsEncrypt. If you already have LetsEncrypt running on this server, skip this step:

    mkdir "$HOME"/certs
    docker run -d -p 80:80 -p 443:443 \
      --name nginx-proxy \
      -v "$HOME"/certs:/etc/nginx/certs:ro \
      -v /etc/nginx/vhost.d \
      -v /usr/share/nginx/html \
      -v /var/run/docker.sock:/tmp/docker.sock:ro \
      --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy \
      --restart=always \
      jwilder/nginx-proxy
    docker run -d \
      --name nginx-letsencrypt \
      -v "$HOME"/certs:/etc/nginx/certs:rw \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      --volumes-from nginx-proxy \
      --restart=always \
      jrcs/letsencrypt-nginx-proxy-companion

Connect your network and restart the Let's Encrypt container:

    docker network connect "$DOCKERNETWORK" nginx-proxy
    docker restart nginx-letsencrypt

After 120 seconds the security certificate should work, and site should work with LetsEncrypt.

Jekyll
-----

HTML websites are just old school files written in HTML, CSS and Javascript.

Jekyll websites can have extra information which is used to "build" the HTML websites.

This project contains an example HTML file at ./docs/index.html and an example Jekyll file at ./docs/jekyll/jekyll-simple.html

To see Jekyll in action, fork this project and enable GitHub pages on your project; or else install Docker, then run

    ./scripts/deploy.sh

And visit http://0.0.0.0:8082/jekyll/jekyll-simple.html.

When to choose Jekyll vs LAMP (Wordpress, Drupal...) and other stacks
-----

When deciding on how to build a website, you might find yourself faced with a choice between different _stacks_:

* LAMP stacks (Linux, Apache, MySQL, PHP)
* MERN stacks (MongoDB, Express, React, NodeJS)
* JAM stacks (Javascript, API, Markup)

These stacks can be put into two broad categories:

* **Server-heavy websites** such as LAMP stack sites (Drupal, Wordpress, Joomla) or MERN stack sites. This is a good solution if you are developing a web-based community with multiple users such as forum or the next Reddit, a dating site, or other project with user-supplied content.
* **Static Site Generators**. Jekyll fits into this category; and these can be a good fit for sites which have little or no user-supplied content. (All user-supplied content such as comments and contact form submissions need to go through a third-party service such as Disqus for comments or Formspree for forms.)

Getting started with Jekyll
-----

    git remote add origin https://github.com/dcycle/starterkit-jekyll.git
    git remote add origin git@github.com:YOUR/GIT_REPO.git

Then modify ./config/versioned

In ./docs/admin/config.yml change backend repo

In ./docs/_data/config.yml put your own API tokens

NetlifyCMS, the CMS for static sites
-----

Static sites such as Jekyll are completely rebuilt every time a change is made to the underlying code, then served as static files on any cheap hosting platform. No PHP, no database server, just straight up, _version controlled_ files.

If your only make changes to your website between a dozen times an hour to once a year or less, this can be a good solution for you.

The underlying code is quite clean and uses standard YAML and Liquid syntax. Although not as daunting as, say a Drupal database, is still not very user-friendly.

Enter NetlifyCMS, an open-source CMS written in Javascript that site editors launch on their browsers and which communicates directly with the code repository. Therefore, as an organization, you don't need to maintain a server to run your CMS. That task is taken care of by your site editors on their browser, lowering costs. That's NetlifyCMS.

For NetlifyCMS to communicate with your online codebase, you still need an authentication service such Netlify.com, or you can build your own.

A feature-rich Jekyll interface
-----

If you like learning by example, a more feature-rich Jekyll site is in progress at ./docs/jekyll-feature-rich.html.

To see it in action, install Docker, then run:

    ./scripts/deploy.sh

Then visit http://0.0.0.0:8082/jekyll-feature-rich.html.

Here are some of the cool features of this Jekyll site:

* Content types with their own fields; these are defined in `./docs/jekyll_blogposts/_posts/*`, `./jekyll_events/_posts/*`, `./jekyll_pages/_posts/*`.
* Blog posts
* Locations on a map. See ./docs/jekyll_locations/_posts. These can be simple lat/lon coordinates, or a complex Polygon. In our example we used data from https://github.com/datasets/geo-countries to get the polygon for the country of Haiti (careful, the lat lon are inversed). To see this in action, visit /jekyll/locations/
* Discontiguous locations: locations can be a discontiguous polygon. For example, Alaska, mainland USA and other territories constitute a single country. Haiti is one such example; please look at the example of how this is supported herein.

To come:

* Blog posts categorized by tag
* Limited Wysiwyg capabilities
* Image, file, PDF library
* Multilingual
* Our Team section
* Our Clients section
* Contact Us and form
* Interactive map
* Alert banner
* Popup banner
* Comments
* Photo gallery
* Not found page (https://jekyllrb.com/tutorials/custom-404-page/)

Events
-----

Events can be a challenge in Static Sites, because if we generate our site in 2021, we want events coming up in 2022 to show up, but if we do not regenerate our static site in 2022, then visit the site in 2023, we no longer want the 2022 event to show up.

We get around this by using Javascript to populate the event page.

Events are available at /api/v1/events.json, then are parsed, depending on the current date, at /events.

If you want to simulate how the site will look at any date in the past or future, visit /events?simulate_current_date=2021-07-05T19:40:47.382Z

Resources
-----

* https://github.com/BlackrockDigital/startbootstrap
* https://vole.wtf/text-generator/
* https://leafletjs.com/examples/quick-start/
* https://github.com/Leaflet/Leaflet.markercluster#using-the-plugin

Images
-----

Images from [Unsplash](https://unsplash.com):

* https://unsplash.com/photos/Q5qHoTs2tFI
* https://unsplash.com/photos/iV1b4jCQz3A
* https://unsplash.com/photos/8ZcYCX5hmQ8
* https://unsplash.com/photos/BZBGi6y9N9c
* https://unsplash.com/photos/GDGf6sUJ6H4
* https://unsplash.com/photos/Cz7nbP8yeMY
