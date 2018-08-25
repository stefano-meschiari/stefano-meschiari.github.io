library(scholar)
library(ggplot2)
library(ggsci)
library(dplyr)
library(purrr)
library(ggthemes)
library(stringr)

id <- "r_wjpacAAAAJ"
profile <- get_profile(id)
author_name <- "S Meschiari"
pubs <- get_publications(id) %>%
  mutate(is_first_author = str_detect(author, str_c("^", author_name))) %>%
  arrange(desc(is_first_author), year) %>%
  filter(cites > 4)


body <- map_chr(1:nrow(pubs), function(i) {
  row <- pubs[i,]
  title <- row$title
  url <- sprintf("https://scholar.google.com/scholar?q=%s", title)
  authors <- str_replace(row$author, "\\.\\.\\.$", " et al.")

  if (!str_detect(authors, author_name)) {
    authors <- str_replace(authors, " et al.", "S Meschiari, et al.")
  }

  authors <- str_replace_all(authors, author_name, str_c("**", author_name, "**"))

  sprintf(
    "* [%s](%s), %s, *%s*, %s.\n\n",
    title,
    url,
    authors,
    row$journal,
    row$year
  )
})

get_citation_history(id) %>%
  ggplot(aes(x=year, y=cites)) +
  geom_col() +
  ggtitle("Citations") +
  theme_fivethirtyeight()

ggsave("../img/citations.png", device = "png", width=3, height=3, dpi=150)

cat(body, file = "../_includes/papers.md", sep = "\n")
