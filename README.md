Jekyll or HTML starterkit
=====

[![CircleCI](https://circleci.com/gh/dcycle/starterkit-jekyll/tree/master.svg?style=svg)](https://circleci.com/gh/dcycle/starterkit-jekyll/tree/master)

Starterkit for new HTML or Jekyll websites.

HTML or Jekyll, what's the difference?
-----

It is not necessary to use or understand Jekyll to to use this project. Its basic use case is that of a simple HTML website, so you can develop HTML just as you normally would.

If you would like to use Jekyll, please see the "Jekyll" section below.

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

Jekyll
-----

HTML websites are just old school files written in HTML, CSS and Javascript.

Jekyll websites can have extra information which is used to "build" the HTML websites.

This project contains an example HTML file at ./docs/index.html and an example Jekyll file at ./docs/jekyll-simple.html

When to choose Jekyll vs LAMP (Wordpress, Drupal...) and other stacks
-----

When deciding on how to build a website, you might find yourself faced with a choice between different _stacks_:

* LAMP stacks (Linux, Apache, MySQL, PHP)
* MERN stacks (MongoDB, Express, React, NodeJS)
* JAM stacks (Javascript, API, Markup)

These stacks can be put into two broad categories:

* **Server-heavy websites** such as LAMP stack sites (Drupal, Wordpress, Joomla) or MERN stack sites. This is a good solution if you are developing a web-based community with multiple users such as forum or the next Reddit, a dating site, or other project with user-supplied content.
* **Static Site Generators**. Jekyll fits into this category; and these can be a good fit for sites which have little or no user-supplied content. (All user-supplied content such as comments and contact form submissions need to go through a third-party service such as Disqus for comments or Formspree for forms.)

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

Resources
-----

* https://github.com/BlackrockDigital/startbootstrap
