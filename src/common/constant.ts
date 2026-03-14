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

- Hyperlinks Syntax
    * Syntax
        - Use [L:url] to add hyperlink to topic
        - Example: GitHub Website [L:https://github.com]
    * Usage
        - Can be applied to any topic including central topic
        - Can be combined with other markers

- Notes Syntax
    * Syntax
        - Use [N:content] to add notes to topic
        - Example: Meeting Topic [N:Remember to prepare slides]
    * Limitations
        - Only supports plain text, no complex formatting
        - Cannot contain nested markers

- Folded Topics Syntax
    * Syntax
        - Use [F] to make a topic appear folded
        - Example: Project Details [F]
            - Subtopic 1
            - Subtopic 2
    * Behavior
        - Child topics will be hidden by default in the mind map
        - Useful for large mind maps with many branches

- Usage Tips [S]
    * Marker Rules
        - Markers must directly follow topic content (no spaces)
        - Numbers can be non-consecutive
    * Unsupported Features
        - Floating Topics are not currently supported
[S] Usage Limitations and Tips`

export const defaultXMindMarkForCN = `XMindMark 语法教程

- 基本结构
    * 中心主题
        - 文档第一行作为中心主题
        - 前面的空行会被忽略
    * 主题层级 [B1]
        - 使用 \`-\` 或 \`*\` 开始一行
        * 主题后必须有至少一个空格[S]
        * 同级主题之间的空行会被忽略[S]
        [S] 使用 \`*\` 同样有效
    * 缩进规则 [B1]
        - 主要主题（第一级）无需缩进
        - 子主题需要缩进（一个Tab等于4个空格）
        - 缩进层级决定主题层级
            - 如，外框、概要与其描述需在同一缩进层级[B1][S1]
            - 参考本主题块的缩进示例 [B1][S1]
            [B1] 外框
            [S1] 概要
    [B1] 基础语法

- 关系语法
    * 语法规则
        - 使用 [<数字>] 标记源主题[1]
        - 使用 [^<数字>] 标记目标主题
        - 相同数字创建关系
    * 关系标题[^1](关系标题)
        - 在 [^<数字>] 后添加(标题内容)

- 外框语法
    * 基础语法
        - 使用 [B<可选数字>] 创建外框
        - 连续带相同标记的同级主题会被同一外框包围
    * 多外框使用
        - 使用数字区分不同外框如
            - 外框 1-1[B1]
            - 外框 1-2[B1]
            [B1] B1 外框
            - 外框 2-1[B2]
            - 外框 2-2[B2]
            [B2] B2 外框
    * 外框标题
        - 使用 [B<可选数字>] 外框标题添加标题[B1]
        - 与被包围主题保持同样缩进级别[B1]
        [B1] B1 外框标题
        

- 概要语法
    * 基本用法
        - 使用 [S<可选数字>] 标记需要概要的主题[S1]
        - 使用 [S<可选数字>] 概要内容 设置概要标题[S1]
        [S1] 只能概要同一父级的主题
    * 特殊功能
        - 概要主题可以有自己的子主题[S2]
        - 概要主题也可以使用外框和联系标记[S2]
        [S2] 概要描述
            - 概要子主题 1[B]
            - 概要子主题 2[B]
            [B] 概要外框

- 高级技巧 [B][3]
    * 多重标记
        - 一个主题可以同时添加多种标记
        - 例如：主题内容[B1][^3][S2]
    * 组合功能
        - 外框和概要可以结合使用
        - 联系可以连接到外框或概要标题
[B] 进阶语法

- 超链接语法
    * 语法
        - 使用 [L:url] 为主题添加超链接
        - 例如：GitHub网站 [L:https://github.com]
    * 用法
        - 可应用于任何主题，包括中心主题
        - 可与其他标记组合使用

- 笔记语法
    * 语法
        - 使用 [N:内容] 为主题添加笔记
        - 例如：会议主题 [N:记得准备幻灯片]
    * 限制
        - 仅支持纯文本，不支持复杂格式
        - 不能包含嵌套标记

- 折叠主题语法
    * 语法
        - 使用 [F] 使主题显示为折叠状态
        - 例如：项目细节 [F]
            - 子主题 1
            - 子主题 2
    * 行为
        - 子主题在思维导图中默认会被隐藏
        - 适用于具有多个分支的大型思维导图

- 使用提示 [S]
    * 标记规则
        - 标记必须紧跟主题内容（无空格）
        - 数字可以不连续
    * 未支持功能
        - 浮动主题目前不支持
[S] 使用限制和提示`
