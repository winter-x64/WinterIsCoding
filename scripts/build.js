const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'themes');

const themeFiles = [
    'WinterIsCoding-color-theme.json',
    'WinterIsCoding-flow-color-theme.json',
    'WinterIsCoding-Zone-color-theme.json',
    'WinterIsCoding-Zone-no-italic-color-theme.json',
    'gift.json'
];

const modernUiTokens = {
    // Sticky Scroll
    "editorStickyScroll.background": "#181818",
    "editorStickyScrollHover.background": "#272727",
    "editorStickyScroll.border": "#282828",

    // Command Center
    "commandCenter.foreground": "#cccccc",
    "commandCenter.activeForeground": "#ffffff",
    "commandCenter.background": "#181818",
    "commandCenter.activeBackground": "#242424",
    "commandCenter.border": "#303030",

    // Bracket Pair Colorization & Guides
    "editorBracketHighlight.foreground1": "#ffcc5c",
    "editorBracketHighlight.foreground2": "#77d2ff",
    "editorBracketHighlight.foreground3": "#ae81ff",
    "editorBracketHighlight.foreground4": "#6366f1",
    "editorBracketHighlight.foreground5": "#9bb955",
    "editorBracketHighlight.foreground6": "#ff8484",
    "editorBracketHighlight.unexpectedBracket.foreground": "#f48771",
    "editorBracketPairGuide.activeBackground1": "#ffcc5c77",
    "editorBracketPairGuide.activeBackground2": "#77d2ff77",
    "editorBracketPairGuide.activeBackground3": "#ae81ff77",
    "editorBracketPairGuide.activeBackground4": "#6366f177",
    "editorBracketPairGuide.activeBackground5": "#9bb95577",
    "editorBracketPairGuide.activeBackground6": "#ff848477",

    // Inline Chat & AI (Copilot)
    "inlineChat.background": "#1e1e1e",
    "inlineChat.border": "#444444",
    "inlineChatInput.border": "#6366f1",
    "chat.requestBackground": "#242424",
    "chat.requestBorder": "#333333",
    "chat.avatarBackground": "#6366f1",
    "chat.avatarForeground": "#ffffff",

    // Action Widgets & Popups
    "editorActionList.background": "#1e1e1e",
    "editorActionList.foreground": "#ffffff",
    "editorActionList.focusForeground": "#ffffff",
    "editorActionList.focusBackground": "#6366f1",

    // Multi-Diff & Merge Editor
    "multiDiffEditor.headerBackground": "#181818",
    "multiDiffEditor.background": "#1a1a1a",
    "mergeEditor.conflict.unhandledUnfocused.border": "#6366f1"
};

const expandedSemanticTokens = {
    "enumMember": { "foreground": "#77d2ff" },
    "variable.constant": { "foreground": "#ffffff" },
    "variable.defaultLibrary": { "foreground": "#ffcc5c" },
    "parameter": { "foreground": "#9cdcfe" },
    "property": { "foreground": "#77d2ff" },
    "property.readonly": { "foreground": "#ffcc5c" },
    "variable.readonly": { "foreground": "#ffcc5c" },
    "type": { "foreground": "#8dbdff" },
    "class": { "foreground": "#8dbdff" },
    "interface": { "foreground": "#8dbdff" },
    "enum": { "foreground": "#8dbdff" },
    "function": { "foreground": "#ffcc5c" },
    "method": { "foreground": "#ffcc5c" },
    "macro": { "foreground": "#ae81ff" },
    "namespace": { "foreground": "#8dbdff" },
    "typeParameter": { "foreground": "#ae81ff" },
    "selfParameter": { "foreground": "#77d2ff" },
    "clsParameter": { "foreground": "#77d2ff" }
};

function stripCommentsAndParse(jsonString) {
    let cleaned = jsonString.replace(/^\s*\/\/.*$/gm, '');
    cleaned = cleaned.replace(/,\s*([\]}])/g, '$1');
    return JSON.parse(cleaned);
}

function applyVariantDesignPillars(filename, colors) {
    if (filename.includes('flow')) {
        // Flow: Borderless single sheet design
        colors["sideBar.border"] = "#00000000";
        colors["panel.border"] = "#00000000";
        colors["editorGroup.border"] = "#00000000";
        colors["editorGroupHeader.tabsBorder"] = "#00000000";
        colors["statusBar.border"] = "#00000000";
        colors["titleBar.border"] = "#00000000";
        colors["diffEditor.border"] = "#00000000";
        colors["focusBorder"] = "#6366f188";
    } else if (filename.toLowerCase().includes('zone')) {
        // Zone: Framed zone borders design
        colors["sideBar.border"] = "#282828";
        colors["panel.border"] = "#282828";
        colors["editorGroup.border"] = "#333333";
        colors["editorGroupHeader.tabsBorder"] = "#282828";
        colors["statusBar.border"] = "#282828";
        colors["titleBar.border"] = "#282828";
        colors["diffEditor.border"] = "#333333";
        colors["focusBorder"] = "#6366f1";
    } else {
        // Normal: Complete panels design (layered background panels)
        colors["focusBorder"] = "#6366f1";
    }
}

function updateTheme(filePath) {
    const filename = path.basename(filePath);
    console.log(`Processing theme: ${filename}...`);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const themeData = stripCommentsAndParse(rawContent);

    // 1. Add schema
    const updatedTheme = {
        "$schema": "vscode://schemas/color-theme",
        ...themeData
    };

    // 2. Ensure semantic highlighting & expanded tokens
    updatedTheme.semanticHighlighting = true;
    updatedTheme.semanticTokenColors = {
        ...expandedSemanticTokens,
        ...(themeData.semanticTokenColors || {})
    };

    // 3. Modernize UI colors
    if (!updatedTheme.colors) {
        updatedTheme.colors = {};
    }

    // Replace deprecated tokens if present
    if (updatedTheme.colors["editorIndentGuide.background1"]) {
        updatedTheme.colors["editorIndentGuide.background"] = updatedTheme.colors["editorIndentGuide.background1"];
        delete updatedTheme.colors["editorIndentGuide.background1"];
    }
    if (updatedTheme.colors["editorIndentGuide.activeBackground1"]) {
        updatedTheme.colors["editorIndentGuide.activeBackground"] = updatedTheme.colors["editorIndentGuide.activeBackground1"];
        delete updatedTheme.colors["editorIndentGuide.activeBackground1"];
    }

    // Inject missing modern UI tokens
    for (const [tokenKey, tokenVal] of Object.entries(modernUiTokens)) {
        if (!updatedTheme.colors[tokenKey]) {
            updatedTheme.colors[tokenKey] = tokenVal;
        }
    }

    // Apply architectural design pillars for Normal, Flow, and Zone
    applyVariantDesignPillars(filename, updatedTheme.colors);

    // 4. Boost low contrast comments for WCAG AA (>= 4.5:1)
    if (Array.isArray(updatedTheme.tokenColors)) {
        for (const tokenRule of updatedTheme.tokenColors) {
            if (tokenRule.scope && (
                typeof tokenRule.scope === 'string' && tokenRule.scope.includes('comment') ||
                Array.isArray(tokenRule.scope) && tokenRule.scope.some(s => s.includes('comment'))
            )) {
                if (tokenRule.settings && (tokenRule.settings.foreground === '#5a5a5a' || tokenRule.settings.foreground === '#707070')) {
                    tokenRule.settings.foreground = '#808080';
                }
            }
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedTheme, null, 4) + '\n', 'utf8');
    console.log(`Successfully updated ${filename}.`);
}

function generateOledVariant(baseThemePath) {
    const oledPath = path.join(THEMES_DIR, 'WinterIsCoding-OLED-color-theme.json');
    console.log('Generating WinterIsCoding Midnight OLED variant...');
    const rawContent = fs.readFileSync(baseThemePath, 'utf8');
    const themeData = stripCommentsAndParse(rawContent);

    themeData.name = "WinterIsCoding Midnight OLED";
    themeData.type = "dark";
    if (!themeData.colors) themeData.colors = {};

    themeData.colors["editor.background"] = "#000000";
    themeData.colors["sideBar.background"] = "#000000";
    themeData.colors["activityBar.background"] = "#000000";
    themeData.colors["statusBar.background"] = "#000000";
    themeData.colors["editorGroupHeader.tabsBackground"] = "#000000";
    themeData.colors["tab.inactiveBackground"] = "#000000";
    themeData.colors["tab.activeBackground"] = "#0a0a0a";
    themeData.colors["panel.background"] = "#000000";
    themeData.colors["sideBar.border"] = "#222222";
    themeData.colors["panel.border"] = "#222222";
    themeData.colors["editorGroup.border"] = "#222222";
    themeData.colors["focusBorder"] = "#6366f1";
    themeData.colors["editorStickyScroll.background"] = "#000000";
    themeData.colors["commandCenter.background"] = "#000000";

    fs.writeFileSync(oledPath, JSON.stringify(themeData, null, 4) + '\n', 'utf8');
    updateTheme(oledPath);
}

function generateFrostLightVariant() {
    const frostPath = path.join(THEMES_DIR, 'WinterIsCoding-Frost-Light-color-theme.json');
    console.log('Generating WinterIsCoding Frost Light variant...');

    const frostTheme = {
        "$schema": "vscode://schemas/color-theme",
        "name": "WinterIsCoding Frost Light",
        "type": "light",
        "semanticHighlighting": true,
        "semanticTokenColors": {
            "enumMember": { "foreground": "#0284c7" },
            "variable.constant": { "foreground": "#0f172a" },
            "variable.defaultLibrary": { "foreground": "#d97706" },
            "parameter": { "foreground": "#0284c7" },
            "property": { "foreground": "#0284c7" },
            "type": { "foreground": "#0d9488" },
            "class": { "foreground": "#0d9488" },
            "interface": { "foreground": "#0d9488" },
            "function": { "foreground": "#2563eb" },
            "method": { "foreground": "#2563eb" },
            "macro": { "foreground": "#7c3aed" }
        },
        "tokenColors": [
            {
                "scope": ["comment", "punctuation.definition.comment"],
                "settings": { "foreground": "#64748b", "fontStyle": "italic" }
            },
            {
                "scope": ["string", "punctuation.definition.string"],
                "settings": { "foreground": "#0284c7" }
            },
            {
                "scope": ["keyword", "storage.type", "storage.modifier"],
                "settings": { "foreground": "#6366f1", "fontStyle": "bold" }
            },
            {
                "scope": ["entity.name.function", "support.function"],
                "settings": { "foreground": "#2563eb" }
            },
            {
                "scope": ["entity.name.type", "entity.name.class", "support.class"],
                "settings": { "foreground": "#0d9488" }
            },
            {
                "scope": ["constant.numeric", "constant.language"],
                "settings": { "foreground": "#d97706" }
            },
            {
                "scope": ["variable", "support.variable"],
                "settings": { "foreground": "#0f172a" }
            }
        ],
        "colors": {
            "editor.background": "#ffffff",
            "editor.foreground": "#0f172a",
            "sideBar.background": "#f1f5f9",
            "sideBar.foreground": "#334155",
            "sideBar.border": "#e2e8f0",
            "activityBar.background": "#e2e8f0",
            "activityBar.foreground": "#0f172a",
            "activityBarBadge.background": "#0ea5e9",
            "activityBarBadge.foreground": "#ffffff",
            "statusBar.background": "#0ea5e9",
            "statusBar.foreground": "#ffffff",
            "editorGroupHeader.tabsBackground": "#f1f5f9",
            "tab.activeBackground": "#ffffff",
            "tab.activeForeground": "#0f172a",
            "tab.inactiveBackground": "#f1f5f9",
            "tab.inactiveForeground": "#64748b",
            "editor.lineHighlightBackground": "#f1f5f9",
            "editor.selectionBackground": "#38bdf840",
            "focusBorder": "#0ea5e9",
            "editorBracketHighlight.foreground1": "#d97706",
            "editorBracketHighlight.foreground2": "#0284c7",
            "editorBracketHighlight.foreground3": "#7c3aed",
            "editorBracketHighlight.foreground4": "#6366f1",
            "editorBracketHighlight.foreground5": "#16a34a",
            "editorBracketHighlight.foreground6": "#dc2626"
        }
    };

    fs.writeFileSync(frostPath, JSON.stringify(frostTheme, null, 4) + '\n', 'utf8');
    console.log('Successfully generated WinterIsCoding Frost Light.');
}

console.log('Building themes with variant design pillars...');
for (const file of themeFiles) {
    const fullPath = path.join(THEMES_DIR, file);
    if (fs.existsSync(fullPath)) {
        updateTheme(fullPath);
    } else {
        console.warn(`Warning: Theme file not found: ${file}`);
    }
}

// Generate OLED & Light variants
generateOledVariant(path.join(THEMES_DIR, 'WinterIsCoding-color-theme.json'));
generateFrostLightVariant();

console.log('All themes built successfully!');
