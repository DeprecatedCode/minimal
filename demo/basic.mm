layout
    hero
    about
        title
        intro
        section.layout
        section.content
        section.style

define layout
    section
        title
        body

    hero
        title
        tagline

content
    hero
        title
            "Minimal"
        text
            "Templating: layout, content, and style. Solved."

style
    hero
        title
            :font-size 2em
        text
            :font-size 1.5em

content
    about title "Minimal: You'll fall in love."
    about intro md[[
Latch on to the excitement of web development all over again with the simplest templating language ever created. Simply
smile and write Minimal.

There are 3 main tags in a .mm file, and we'll cover each one in detail below.
    ]]

content
    about
        .layout
            title "Layout"
            body md[[
Layout defines the structure of your HTML.
            ]]
        .content
            title "Content"
            body md[[
Content defines the text and markdown or even HTML to apply to the layout.
            ]]
        .style
            title "Style"
            body md[[
Style defines the CSS rules to apply to the layout.
            ]]

style
    about
        :line-height 1.4

        title
            :font-size 1.5em
