FROM pierrezemb/gostatic

ADD ./dist/ /srv/http

ENTRYPOINT ["/goStatic", "-fallback=/index.html"]
