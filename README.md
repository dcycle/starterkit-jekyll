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

Resources
-----

* https://github.com/BlackrockDigital/startbootstrap
