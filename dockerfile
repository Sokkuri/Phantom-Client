FROM pierrezemb/gostatic

ADD ./dist/artifact/ /srv/http

ENTRYPOINT ["/goStatic", "-fallback=/index.html"]
