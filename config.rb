require 'compass/import-once/activate'
# Require any additional compass plugins here.
#
require 'sass-globbing'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = ""
sass_dir = ""
images_dir = ""
javascripts_dir = ""

# You can select your preferred output style here (can be overridden via the command line):


# 開発環境か本番用かで設定を振り分ける

# 本番環境へのビルド
# compass watch -e production

# 開発環境へのビルド
# compass watch

#何も書かなければデフォルトは:development
environment = :development

#圧縮するかどうかの設定(:nested, :expanded, :compact, or :compressed)
output_style = (environment == :production) ? :compressed : :expanded

#SASS内の行番号の出力(true or false)
line_comments = (environment == :production) ? :false : :true


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
