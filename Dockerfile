FROM ruby:2.5.1

RUN apt-get update -qq && apt-get install -y \
    nodejs                                   \
    build-essential

ENV APP_HOME /usr/src/app

WORKDIR $APP_HOME
COPY Gemfile* $APP_HOME/
RUN bundle install

COPY . $APP_HOME/

EXPOSE 4567
CMD ["middleman", "build", "--verbose"]
