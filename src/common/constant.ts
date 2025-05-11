export const defaultXMindMark = `XMindMark Syntax Guide

- Basic Structure
    * Central Topic
        - The first line of document serves as the central topic
        - Empty lines before will be ignored
    * Topic Hierarchy [B1]
        - Use \`-\` or \`*\` to start a line
        * Must have at least one space after topic[S]
        * Empty lines between topics of same level will be ignored[S]
        [S] Using \`*\` at the beginning of a line works the same way
    * Indentation Rules [B1]
        - Main Topics (first level) require no indentation
        - Sub-topics need indentation (one Tab equals 4 spaces)
        - Indentation level determines topic hierarchy
            - For example, boundary and summary descriptions should be at the same indentation level[B1][S1]
            - Refer to the indentation example in this topic block [B1][S1]
            [B1] Boundary
            [S1] Summary
    [B1] Basic Syntax

- Relationship Syntax
    * Syntax Rules
        - Use [<number>] to mark source topic[1]
        - Use [^<number>] to mark target topic
        - Same number creates connection
    * Relationship Title[^1](Relationship Title)
        - Add (title content) after [^<number>]

- Boundary Syntax
    * Basic Syntax
        - Use [B<optional number>] to create boundary
        - Consecutive topics at the same level with the same marker will be wrapped by the same boundary
    * Using Multiple Boundaries
        - Use numbers to distinguish different boundaries
            - Boundary 1-1[B1]
            - Boundary 1-2[B1]
            [B1] B1 Boundary
            - Boundary 2-1[B2]
            - Boundary 2-2[B2]
            [B2] B2 Boundary
    * Boundary Title
        - Use [B<optional number>] boundary title to add title[B1]
        - Keep same indentation level as the wrapped topics[B1]
        [B1] B1 Boundary Title
        

- Summary Syntax
    * Basic Usage
        - Use [S<optional number>] to mark topics requiring summary[S1]
        - Use [S<optional number>] summary content to set summary title[S1]
        [S1] Can only summarize topics with the same parent
    * Special Features
        - Summary topics can have their own sub-topics[S2]
        - Summary topics can also use boundary and relationship markers[S2]
        [S2] Summary Description
            - Summary sub-topic 1[B]
            - Summary sub-topic 2[B]
            [B] Summary Boundary

- Advanced Techniques [B][3]
    * Multiple Markers
        - A topic can have multiple types of markers simultaneously
        - Example: Topic content[B1][^3][S2]
    * Combined Features
        - Boundaries and summaries can be used together
        - Relationships can connect to boundary or summary titles
[B] Advanced Syntax

- Notes [S]
    * Marker Rules
        - Markers must directly follow topic content (no spaces)
        - Numbers can be non-consecutive
    * Unsupported Features
        - Floating Topics are not currently supported
[S] Usage Limitations and Tips`