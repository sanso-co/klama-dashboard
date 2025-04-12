import { ChangeEvent, useEffect, useState } from "react";
import styles from "./editor.module.scss";
import { Button } from "../Button";

interface Props {
    initialValue?: string;
    onChange?: (markdown: string) => void;
    onSubmit?: (content: string) => void;
}

export const MarkdownEditor = ({ initialValue = "", onChange, onSubmit }: Props) => {
    const [markdown, setMarkdown] = useState(initialValue);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    useEffect(() => {
        if (initialValue) {
            setMarkdown(initialValue);
        }
    }, [initialValue]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setMarkdown(newValue);
        onChange?.(newValue);
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(markdown);
        }
    };

    const convertMarkdownToHtml = (md: string): string => {
        let html = md
            // Headers
            .replace(/^# (.*$)/gm, `<h1 class="${styles.h1}">$1</h1>`)
            .replace(/^## (.*$)/gm, `<h2 class="${styles.h2}">$1</h2>`)
            .replace(/^### (.*$)/gm, `<h3 class="${styles.h3}">$1</h3>`)
            // Paragraphs
            .replace(/^\s*(\n)?([^\n]+)/gm, function (match) {
                return /\<(\/)?(h1|h2|h3|ul|ol|li|blockquote|code|pre|strong|em)\>/g.test(match)
                    ? match
                    : `<p class="${styles.paragraph}">` + match + "</p>";
            })
            // Lists
            .replace(
                /^\s*\* (.*)/gm,
                `<ul class="${styles.unorderedList}"><li class="${styles.listItem}">$1</li></ul>`
            )
            .replace(
                /^\s*\d\. (.*)/gm,
                `<ol class="${styles.orderedList}"><li class="${styles.listItem}">$1</li></ol>`
            )
            // Blockquotes
            .replace(/^\> (.*$)/gm, `<blockquote class="${styles.blockquote}">$1</blockquote>`)
            // Code blocks
            .replace(/`([^`]+)`/g, `<code class="${styles.inlineCode}">$1</code>`)
            .replace(/```([\s\S]*?)```/g, `<pre class="${styles.codeBlock}"><code>$1</code></pre>`)
            // Links
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, `<a class="${styles.link}" href="$2">$1</a>`)
            // Bold
            .replace(/\*\*([^*]+)\*\*/g, `<strong class="${styles.bold}">$1</strong>`)
            // Italic
            .replace(/\*([^*]+)\*/g, `<em class="${styles.italic}">$1</em>`);

        return html;
    };

    return (
        <div className={styles.container}>
            <div className={styles.editorWrapper}>
                {!isPreviewMode ? (
                    <textarea
                        className={styles.editor}
                        value={markdown}
                        onChange={handleChange}
                        placeholder="Enter your markdown here..."
                    />
                ) : (
                    <div
                        className={styles.preview}
                        dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown) }}
                    />
                )}
                <div className={styles.buttons}>
                    <Button variant="secondary" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                        {isPreviewMode ? "Edit" : "Preview"}
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    );
};
