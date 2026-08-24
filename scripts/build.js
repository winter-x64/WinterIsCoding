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

// Dark theme modern baseline tokens
const darkModernUiTokens = {
    // Buttons & Action Controls
    "button.background": "#6366f1",
    "button.foreground": "#ffffff",
    "button.hoverBackground": "#4f46e5",
    "button.secondaryBackground": "#2a2a2a",
    "button.secondaryForeground": "#ffffff",
    "button.secondaryHoverBackground": "#383838",
    "button.border": "#00000000",
    "button.separator": "#333333",

    // Extension & Action Buttons
    "extensionButton.prominentBackground": "#6366f1",
    "extensionButton.prominentForeground": "#ffffff",
    "extensionButton.prominentHoverBackground": "#4f46e5",
    "extensionButton.background": "#2a2a2a",
    "extensionButton.foreground": "#ffffff",
    "extensionButton.hoverBackground": "#383838",

    // Lightbulb & Code Action Icons
    "editorLightBulb.foreground": "#ffcc5c",
    "editorLightBulbAutoFix.foreground": "#6366f1",
    "editorLightBulbAi.foreground": "#6366f1",

    // Keybindings & Inline Badges in Hover / Tooltips
    "keybindingLabel.background": "#2a2a2a",
    "keybindingLabel.foreground": "#ffffff",
    "keybindingLabel.border": "#3a3a3a",
    "keybindingLabel.bottomBorder": "#3a3a3a",

    // Markdown & Preformatted Text in Hover Popups
    "textCodeBlock.background": "#242424",
    "textPreformat.background": "#242424",
    "textPreformat.foreground": "#ffffff",
    "textBlockQuote.background": "#242424",
    "textBlockQuote.border": "#6366f1",
    "textLink.foreground": "#6366f1",
    "textLink.activeForeground": "#6366f1",
    "textSeparator.foreground": "#333333",

    // Hover Widget & Popups
    "editorHoverWidget.background": "#1e1e1e",
    "editorHoverWidget.foreground": "#cccccc",
    "editorHoverWidget.border": "#333333",
    "editorHoverWidget.statusBarBackground": "#242424",

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
    "mergeEditor.conflict.unhandledUnfocused.border": "#6366f1",

    // Inlay Hints (TypeScript, Rust, Python, Go, C#)
    "editorInlayHint.background": "#22252c",
    "editorInlayHint.foreground": "#94a3b8",
    "editorInlayHint.typeBackground": "#22252c",
    "editorInlayHint.typeForeground": "#8dbdff",
    "editorInlayHint.parameterBackground": "#22252c",
    "editorInlayHint.parameterForeground": "#9cdcfe",

    // Unnecessary & Unused Code Opacity
    "editorUnnecessaryCode.opacity": "#000000aa",

    // Form & Input Validation (Error, Warning, Info)
    "inputValidation.errorBackground": "#2b1414",
    "inputValidation.errorBorder": "#f48771",
    "inputValidation.errorForeground": "#ffffff",
    "inputValidation.warningBackground": "#2e2410",
    "inputValidation.warningBorder": "#cca700",
    "inputValidation.warningForeground": "#ffffff",
    "inputValidation.infoBackground": "#132338",
    "inputValidation.infoBorder": "#75beff",
    "inputValidation.infoForeground": "#ffffff",

    // Testing UI Subsystem
    "testing.iconPassed": "#c5f467",
    "testing.iconFailed": "#ff8484",
    "testing.iconErrored": "#f48771",
    "testing.iconQueued": "#cca700",
    "testing.iconUnset": "#808080",
    "testing.iconSkipped": "#6e7681",
    "testing.runAction": "#6366f1",

    // Terminal Shell Integration & Decorations
    "terminalCommandDecoration.defaultBackground": "#585858",
    "terminalCommandDecoration.successBackground": "#c5f467",
    "terminalCommandDecoration.errorBackground": "#ff8484",

    // Activity Bar Top (Modern VS Code Top Bar Layout)
    "activityBarTop.foreground": "#ffffff",
    "activityBarTop.activeBorder": "#6366f1",
    "activityBarTop.inactiveForeground": "#ffffff66",

    // Settings Editor & Keybinding Table
    "settings.modifiedItemIndicator": "#6366f1",
    "settings.focusedRowBorder": "#6366f1",
    "keybindingTable.headerBackground": "#1f1f1f",
    "keybindingTable.rowsBackground": "#1a1a1a",

    // Overview Ruler Indicators (Transparent alpha channels so they don't obscure content)
    "editorOverviewRuler.errorForeground": "#f48771bb",
    "editorOverviewRuler.warningForeground": "#cca700bb",
    "editorOverviewRuler.infoForeground": "#75beffbb",
    "editorOverviewRuler.bracketMatchForeground": "#818cf8bb",
    "editorOverviewRuler.findMatchForeground": "#ffcc5caa",

    // Banner & Notification Elements
    "banner.background": "#242424",
    "banner.foreground": "#ffffff",
    "banner.iconForeground": "#6366f1",

    // Dropdown & Checkbox Selection States
    "dropdown.listBackground": "#1f1f1f",
    "checkbox.selectBackground": "#6366f1",
    "checkbox.selectBorder": "#6366f1"
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

function applyVariantDesignPillars(filename, themeData) {
    const colors = themeData.colors;

    if (filename.includes('gift')) {
        // ==========================================
        // 1. FOCUS MODE / OBSIDIAN SYSTEM (#0d1117)
        // ==========================================
        themeData.name = "WinterIsCoding [New] Focus Mode";
        colors["editor.background"] = "#0d1117";
        colors["editor.foreground"] = "#e6edf3";
        colors["editorGutter.background"] = "#0d1117";
        colors["editor.lineHighlightBackground"] = "#6366f114";
        colors["editorLineNumber.foreground"] = "#484f58";
        colors["editorLineNumber.activeForeground"] = "#818cf8";

        // SideBar: High contrast legibility + Unified background
        colors["sideBar.background"] = "#0d1117";
        colors["sideBar.foreground"] = "#c9d1d9";
        colors["sideBar.border"] = "#21262d";
        colors["sideBarTitle.foreground"] = "#f0f6fc";
        colors["sideBarSectionHeader.background"] = "#0d1117";
        colors["sideBarSectionHeader.foreground"] = "#8b949e";
        colors["list.hoverBackground"] = "#6366f11a";
        colors["list.activeSelectionBackground"] = "#6366f133";
        colors["list.activeSelectionForeground"] = "#ffffff";
        colors["list.inactiveSelectionBackground"] = "#161b22";
        colors["list.inactiveSelectionForeground"] = "#e6edf3";

        // ActivityBar & TitleBar
        colors["activityBar.background"] = "#0d1117";
        colors["activityBar.foreground"] = "#818cf8";
        colors["activityBar.inactiveForeground"] = "#6e7681";
        colors["activityBar.border"] = "#21262d";
        colors["activityBarTop.activeBorder"] = "#818cf8";

        colors["statusBar.background"] = "#0d1117";
        colors["statusBar.foreground"] = "#8b949e";
        colors["statusBar.border"] = "#21262d";

        colors["titleBar.activeBackground"] = "#0d1117";
        colors["titleBar.activeForeground"] = "#c9d1d9";
        colors["titleBar.border"] = "#21262d";

        // Tabs & Editor Groups
        colors["editorGroupHeader.tabsBackground"] = "#090d12";
        colors["editorGroupHeader.tabsBorder"] = "#21262d";
        colors["tab.activeBackground"] = "#0d1117";
        colors["tab.activeForeground"] = "#f0f6fc";
        colors["tab.activeBorder"] = "#818cf8";
        colors["tab.inactiveBackground"] = "#090d12";
        colors["tab.inactiveForeground"] = "#8b949e";
        colors["tab.border"] = "#21262d";

        // Panels, Widgets & Popups in Obsidian Palette
        colors["panel.background"] = "#0d1117";
        colors["panel.border"] = "#21262d";
        colors["panelTitle.activeForeground"] = "#f0f6fc";
        colors["panelTitle.activeBorder"] = "#818cf8";
        colors["panelTitle.inactiveForeground"] = "#8b949e";
        colors["breadcrumb.background"] = "#0d1117";
        colors["editorStickyScroll.background"] = "#0d1117";
        colors["editorStickyScroll.border"] = "#21262d";
        colors["focusBorder"] = "#818cf8";

        colors["editorHoverWidget.background"] = "#161b22";
        colors["editorHoverWidget.border"] = "#21262d";
        colors["editorHoverWidget.statusBarBackground"] = "#0d1117";
        colors["commandCenter.background"] = "#161b22";
        colors["commandCenter.border"] = "#21262d";
        colors["inlineChat.background"] = "#161b22";
        colors["inlineChat.border"] = "#21262d";
        colors["chat.requestBackground"] = "#0d1117";
        colors["chat.requestBorder"] = "#21262d";
        colors["textCodeBlock.background"] = "#161b22";
        colors["textPreformat.background"] = "#161b22";
        colors["textBlockQuote.background"] = "#161b22";
        colors["keybindingLabel.background"] = "#161b22";
        colors["keybindingLabel.border"] = "#21262d";
        colors["keybindingTable.headerBackground"] = "#161b22";
        colors["keybindingTable.rowsBackground"] = "#0d1117";
        colors["editorInlayHint.background"] = "#161b22";
        colors["editorInlayHint.typeBackground"] = "#161b22";
        colors["editorInlayHint.parameterBackground"] = "#161b22";
        colors["input.background"] = "#161b22";
        colors["input.border"] = "#21262d";
        colors["quickInput.background"] = "#161b22";
        colors["multiDiffEditor.headerBackground"] = "#161b22";
        colors["multiDiffEditor.background"] = "#0d1117";
        colors["inputValidation.errorBackground"] = "#211314";
        colors["inputValidation.errorBorder"] = "#f85149";
        colors["inputValidation.warningBackground"] = "#271f11";
        colors["inputValidation.warningBorder"] = "#d29922";
        colors["inputValidation.infoBackground"] = "#111e2e";
        colors["inputValidation.infoBorder"] = "#58a6ff";
    } else if (filename.includes('flow')) {
        // ==========================================
        // 2. FLOW / SINGLE SHEET CANVAS (#00000000)
        // ==========================================
        themeData.name = "WinterIsCoding [OG] Flow";
        colors["sideBar.border"] = "#00000000";
        colors["panel.border"] = "#00000000";
        colors["editorGroup.border"] = "#00000000";
        colors["editorGroupHeader.tabsBorder"] = "#00000000";
        colors["statusBar.border"] = "#00000000";
        colors["titleBar.border"] = "#00000000";
        colors["diffEditor.border"] = "#00000000";
        colors["editorStickyScroll.border"] = "#00000000";
        colors["commandCenter.border"] = "#00000000";
        colors["inlineChat.border"] = "#00000000";
        colors["chat.requestBorder"] = "#00000000";
        colors["editorHoverWidget.border"] = "#00000000";
        colors["multiDiffEditor.border"] = "#00000000";
        colors["focusBorder"] = "#6366f188";
    } else if (filename.toLowerCase().includes('zone')) {
        // ==========================================
        // 3. ZONE / FRAMED ZONE BORDERS (#282828)
        // ==========================================
        themeData.name = filename.includes('no-italic') ? "WinterIsCoding [OG] Zone [no italic]" : "WinterIsCoding [OG] Zone";
        colors["sideBar.border"] = "#282828";
        colors["panel.border"] = "#282828";
        colors["editorGroup.border"] = "#333333";
        colors["editorGroupHeader.tabsBorder"] = "#282828";
        colors["statusBar.border"] = "#282828";
        colors["titleBar.border"] = "#282828";
        colors["diffEditor.border"] = "#333333";
        colors["editorStickyScroll.border"] = "#282828";
        colors["commandCenter.border"] = "#303030";
        colors["editorHoverWidget.border"] = "#333333";
        colors["inlineChat.border"] = "#333333";
        colors["multiDiffEditor.border"] = "#282828";
        colors["focusBorder"] = "#6366f1";
    } else {
        // ==========================================
        // 4. CLASSIC NORMAL PANELS
        // ==========================================
        themeData.name = "WinterIsCoding [OG]";
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

    // Replace deprecated editorIndentGuide tokens with background1
    if (updatedTheme.colors["editorIndentGuide.background"]) {
        updatedTheme.colors["editorIndentGuide.background1"] = updatedTheme.colors["editorIndentGuide.background"];
        delete updatedTheme.colors["editorIndentGuide.background"];
    }
    if (updatedTheme.colors["editorIndentGuide.activeBackground"]) {
        updatedTheme.colors["editorIndentGuide.activeBackground1"] = updatedTheme.colors["editorIndentGuide.activeBackground"];
        delete updatedTheme.colors["editorIndentGuide.activeBackground"];
    }

    // Inject dark modern UI baseline
    for (const [tokenKey, tokenVal] of Object.entries(darkModernUiTokens)) {
        updatedTheme.colors[tokenKey] = tokenVal;
    }

    // Apply architectural design pillars for Normal, Flow, Zone, and Focus Mode
    applyVariantDesignPillars(filename, updatedTheme);

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

    themeData.name = "WinterIsCoding [New] Midnight OLED";
    themeData.type = "dark";
    if (!themeData.colors) themeData.colors = {};

    // 1. Inject base modern dark tokens
    for (const [tokenKey, tokenVal] of Object.entries(darkModernUiTokens)) {
        themeData.colors[tokenKey] = tokenVal;
    }

    // Replace deprecated editorIndentGuide tokens with background1
    if (themeData.colors["editorIndentGuide.background"]) {
        themeData.colors["editorIndentGuide.background1"] = themeData.colors["editorIndentGuide.background"];
        delete themeData.colors["editorIndentGuide.background"];
    }
    if (themeData.colors["editorIndentGuide.activeBackground"]) {
        themeData.colors["editorIndentGuide.activeBackground1"] = themeData.colors["editorIndentGuide.activeBackground"];
        delete themeData.colors["editorIndentGuide.activeBackground"];
    }

    // 2. Override with Pure OLED #000000 surfaces & wire borders
    themeData.colors["editor.background"] = "#000000";
    themeData.colors["editorGutter.background"] = "#000000";
    themeData.colors["sideBar.background"] = "#000000";
    themeData.colors["activityBar.background"] = "#000000";
    themeData.colors["statusBar.background"] = "#000000";
    themeData.colors["titleBar.activeBackground"] = "#000000";
    themeData.colors["titleBar.inactiveBackground"] = "#000000";
    themeData.colors["editorGroupHeader.tabsBackground"] = "#000000";
    themeData.colors["tab.inactiveBackground"] = "#000000";
    themeData.colors["tab.activeBackground"] = "#0a0a0a";
    themeData.colors["panel.background"] = "#000000";
    themeData.colors["editorStickyScroll.background"] = "#000000";
    themeData.colors["commandCenter.background"] = "#000000";
    themeData.colors["inlineChat.background"] = "#050505";
    themeData.colors["chat.requestBackground"] = "#080808";
    themeData.colors["textCodeBlock.background"] = "#0a0a0a";
    themeData.colors["textPreformat.background"] = "#0a0a0a";
    themeData.colors["keybindingLabel.background"] = "#0a0a0a";
    themeData.colors["keybindingTable.headerBackground"] = "#080808";
    themeData.colors["keybindingTable.rowsBackground"] = "#000000";
    themeData.colors["editorInlayHint.background"] = "#0a0a0a";
    themeData.colors["editorInlayHint.typeBackground"] = "#0a0a0a";
    themeData.colors["editorInlayHint.parameterBackground"] = "#0a0a0a";
    themeData.colors["input.background"] = "#0a0a0a";
    themeData.colors["quickInput.background"] = "#050505";
    themeData.colors["multiDiffEditor.headerBackground"] = "#080808";
    themeData.colors["multiDiffEditor.background"] = "#000000";

    themeData.colors["sideBar.border"] = "#1c1c1c";
    themeData.colors["panel.border"] = "#1c1c1c";
    themeData.colors["editorGroup.border"] = "#1c1c1c";
    themeData.colors["editorGroupHeader.tabsBorder"] = "#1c1c1c";
    themeData.colors["tab.border"] = "#1c1c1c";
    themeData.colors["statusBar.border"] = "#1c1c1c";
    themeData.colors["titleBar.border"] = "#1c1c1c";
    themeData.colors["editorStickyScroll.border"] = "#1c1c1c";
    themeData.colors["commandCenter.border"] = "#222222";
    themeData.colors["editorHoverWidget.border"] = "#222222";
    themeData.colors["editorHoverWidget.background"] = "#050505";
    themeData.colors["editorHoverWidget.statusBarBackground"] = "#000000";
    themeData.colors["inlineChat.border"] = "#222222";
    themeData.colors["chat.requestBorder"] = "#1c1c1c";
    themeData.colors["focusBorder"] = "#818cf8";

    themeData.colors["inputValidation.errorBackground"] = "#150404";
    themeData.colors["inputValidation.errorBorder"] = "#f48771";
    themeData.colors["inputValidation.warningBackground"] = "#151003";
    themeData.colors["inputValidation.warningBorder"] = "#cca700";
    themeData.colors["inputValidation.infoBackground"] = "#040e15";
    themeData.colors["inputValidation.infoBorder"] = "#75beff";

    fs.writeFileSync(oledPath, JSON.stringify(themeData, null, 4) + '\n', 'utf8');
    console.log('Successfully generated WinterIsCoding Midnight OLED.');
}

function generateFrostLightVariant(baseThemePath) {
    const frostPath = path.join(THEMES_DIR, 'WinterIsCoding-Frost-Light-color-theme.json');
    console.log('Generating WinterIsCoding Frost Light variant with full grammar coverage...');
    const rawContent = fs.readFileSync(baseThemePath, 'utf8');
    const baseTheme = stripCommentsAndParse(rawContent);

    const frostTheme = {
        "$schema": "vscode://schemas/color-theme",
        "name": "WinterIsCoding [New] Frost Light",
        "type": "light",
        "semanticHighlighting": true,
        "semanticTokenColors": {
            "enumMember": { "foreground": "#0284c7" },
            "variable.constant": { "foreground": "#0f172a" },
            "variable.defaultLibrary": { "foreground": "#d97706" },
            "parameter": { "foreground": "#0284c7" },
            "property": { "foreground": "#0284c7" },
            "property.readonly": { "foreground": "#d97706" },
            "variable.readonly": { "foreground": "#d97706" },
            "type": { "foreground": "#0d9488" },
            "class": { "foreground": "#0d9488" },
            "interface": { "foreground": "#0d9488" },
            "enum": { "foreground": "#0d9488" },
            "function": { "foreground": "#2563eb" },
            "method": { "foreground": "#2563eb" },
            "macro": { "foreground": "#7c3aed" },
            "namespace": { "foreground": "#0d9488" },
            "typeParameter": { "foreground": "#7c3aed" },
            "selfParameter": { "foreground": "#0284c7" },
            "clsParameter": { "foreground": "#0284c7" }
        },
        "tokenColors": [],
        "colors": {
            // Editor & Core
            "editor.background": "#ffffff",
            "editor.foreground": "#0f172a",
            "editorGutter.background": "#ffffff",
            "editorLineNumber.foreground": "#94a3b8",
            "editorLineNumber.activeForeground": "#0ea5e9",
            "editorCursor.foreground": "#0ea5e9",
            "editor.lineHighlightBackground": "#f8fafc",
            "editor.selectionBackground": "#38bdf833",
            "editor.inactiveSelectionBackground": "#38bdf81a",
            "focusBorder": "#0ea5e9",

            // SideBar & ActivityBar
            "sideBar.background": "#f1f5f9",
            "sideBar.foreground": "#334155",
            "sideBar.border": "#e2e8f0",
            "sideBarTitle.foreground": "#0f172a",
            "sideBarSectionHeader.background": "#e2e8f0",
            "sideBarSectionHeader.foreground": "#334155",
            "activityBar.background": "#e2e8f0",
            "activityBar.foreground": "#0f172a",
            "activityBar.inactiveForeground": "#64748b",
            "activityBar.border": "#cbd5e1",
            "activityBarBadge.background": "#0ea5e9",
            "activityBarBadge.foreground": "#ffffff",
            "activityBarTop.foreground": "#0f172a",
            "activityBarTop.activeBorder": "#0ea5e9",
            "activityBarTop.inactiveForeground": "#64748b",

            // Status Bar & Title Bar
            "statusBar.background": "#0ea5e9",
            "statusBar.foreground": "#ffffff",
            "statusBar.border": "#0284c7",
            "statusBarItem.hoverBackground": "#0284c7",
            "titleBar.activeBackground": "#f1f5f9",
            "titleBar.activeForeground": "#0f172a",
            "titleBar.inactiveBackground": "#f8fafc",
            "titleBar.inactiveForeground": "#94a3b8",
            "titleBar.border": "#e2e8f0",

            // Tabs & Groups
            "editorGroupHeader.tabsBackground": "#f1f5f9",
            "editorGroupHeader.tabsBorder": "#e2e8f0",
            "tab.activeBackground": "#ffffff",
            "tab.activeForeground": "#0f172a",
            "tab.activeBorder": "#0ea5e9",
            "tab.inactiveBackground": "#f1f5f9",
            "tab.inactiveForeground": "#64748b",
            "tab.border": "#e2e8f0",

            // Buttons & Controls
            "button.background": "#0ea5e9",
            "button.foreground": "#ffffff",
            "button.hoverBackground": "#0284c7",
            "button.secondaryBackground": "#e2e8f0",
            "button.secondaryForeground": "#0f172a",
            "button.secondaryHoverBackground": "#cbd5e1",
            "extensionButton.prominentBackground": "#0ea5e9",
            "extensionButton.prominentForeground": "#ffffff",
            "extensionButton.prominentHoverBackground": "#0284c7",

            // Inputs & Forms
            "input.background": "#ffffff",
            "input.foreground": "#0f172a",
            "input.border": "#cbd5e1",
            "input.placeholderForeground": "#94a3b8",
            "dropdown.background": "#ffffff",
            "dropdown.foreground": "#0f172a",
            "dropdown.border": "#cbd5e1",
            "dropdown.listBackground": "#ffffff",
            "checkbox.background": "#ffffff",
            "checkbox.foreground": "#0f172a",
            "checkbox.border": "#cbd5e1",
            "checkbox.selectBackground": "#0ea5e9",
            "checkbox.selectBorder": "#0ea5e9",

            // Popups & Hover Widgets
            "editorHoverWidget.background": "#ffffff",
            "editorHoverWidget.foreground": "#0f172a",
            "editorHoverWidget.border": "#e2e8f0",
            "editorHoverWidget.statusBarBackground": "#f1f5f9",
            "editorStickyScroll.background": "#f8fafc",
            "editorStickyScroll.border": "#e2e8f0",
            "commandCenter.background": "#f1f5f9",
            "commandCenter.border": "#cbd5e1",
            "commandCenter.foreground": "#334155",

            // Inlay Hints (Tailored Light)
            "editorInlayHint.background": "#e2e8f0",
            "editorInlayHint.foreground": "#64748b",
            "editorInlayHint.typeBackground": "#e2e8f0",
            "editorInlayHint.typeForeground": "#0d9488",
            "editorInlayHint.parameterBackground": "#e2e8f0",
            "editorInlayHint.parameterForeground": "#0284c7",

            // Markdown & Keybindings
            "keybindingLabel.background": "#e2e8f0",
            "keybindingLabel.foreground": "#0f172a",
            "keybindingLabel.border": "#cbd5e1",
            "textCodeBlock.background": "#f8fafc",
            "textPreformat.background": "#f8fafc",
            "textPreformat.foreground": "#0f172a",
            "textBlockQuote.background": "#f8fafc",
            "textBlockQuote.border": "#0ea5e9",
            "textLink.foreground": "#0ea5e9",

            // Chat & AI
            "inlineChat.background": "#ffffff",
            "inlineChat.border": "#cbd5e1",
            "inlineChatInput.border": "#0ea5e9",
            "chat.requestBackground": "#f1f5f9",
            "chat.requestBorder": "#e2e8f0",
            "chat.avatarBackground": "#0ea5e9",
            "chat.avatarForeground": "#ffffff",

            // Validation (Light)
            "inputValidation.errorBackground": "#fef2f2",
            "inputValidation.errorBorder": "#ef4444",
            "inputValidation.errorForeground": "#991b1b",
            "inputValidation.warningBackground": "#fffbeb",
            "inputValidation.warningBorder": "#f59e0b",
            "inputValidation.warningForeground": "#92400e",
            "inputValidation.infoBackground": "#f0f9ff",
            "inputValidation.infoBorder": "#0ea5e9",
            "inputValidation.infoForeground": "#075985",

            // Lists & Quick Pick
            "list.hoverBackground": "#e2e8f0",
            "list.activeSelectionBackground": "#0ea5e9",
            "list.activeSelectionForeground": "#ffffff",
            "list.inactiveSelectionBackground": "#e2e8f0",
            "quickInput.background": "#ffffff",
            "quickInput.foreground": "#0f172a",
            "quickInputList.focusBackground": "#0ea5e9",
            "quickInputList.focusForeground": "#ffffff",

            // Bracket Pairs (Light)
            "editorBracketHighlight.foreground1": "#d97706",
            "editorBracketHighlight.foreground2": "#0284c7",
            "editorBracketHighlight.foreground3": "#7c3aed",
            "editorBracketHighlight.foreground4": "#6366f1",
            "editorBracketHighlight.foreground5": "#16a34a",
            "editorBracketHighlight.foreground6": "#0284c7",

            // Testing & Settings
            "testing.iconPassed": "#16a34a",
            "testing.iconFailed": "#dc2626",
            "testing.iconErrored": "#dc2626",
            "testing.runAction": "#0ea5e9",
            "settings.headerForeground": "#0ea5e9",
            "settings.modifiedItemIndicator": "#0ea5e9",
            "settings.focusedRowBorder": "#0ea5e9"
        }
    };

    // Deep copy all 2,000+ line grammar rules and map them to light frost palette
    if (Array.isArray(baseTheme.tokenColors)) {
        for (const rule of baseTheme.tokenColors) {
            const lightRule = JSON.parse(JSON.stringify(rule));
            if (lightRule.settings && lightRule.settings.foreground) {
                const fg = lightRule.settings.foreground.toLowerCase();
                if (['#ffffff', '#cdcdcd', '#cccccc', '#e0e0e0', '#e6edf3'].includes(fg)) {
                    lightRule.settings.foreground = "#0f172a";
                } else if (['#77d2ff', '#5cecc6', '#2de2b2', '#5cb2ff'].includes(fg)) {
                    lightRule.settings.foreground = "#0284c7";
                } else if (['#ffcc5c', '#e2c08d', '#ffaf00'].includes(fg)) {
                    lightRule.settings.foreground = "#d97706";
                } else if (['#8dbdff', '#82c4ff'].includes(fg)) {
                    lightRule.settings.foreground = "#0d9488";
                } else if (['#6366f1', '#7953ff', '#2e6cff'].includes(fg)) {
                    lightRule.settings.foreground = "#4f46e5";
                } else if (['#ae81ff', '#cf8dfb', '#9f00ff'].includes(fg)) {
                    lightRule.settings.foreground = "#7c3aed";
                } else if (['#c5f467', '#9bb955', '#0dbc79'].includes(fg)) {
                    lightRule.settings.foreground = "#16a34a";
                } else if (['#ff8484', '#ff3e3e', '#f48771'].includes(fg)) {
                    lightRule.settings.foreground = "#dc2626";
                } else if (['#808080', '#707070', '#5a5a5a', '#666666', '#858585'].includes(fg)) {
                    lightRule.settings.foreground = "#64748b";
                }
            }
            frostTheme.tokenColors.push(lightRule);
        }
    }

    fs.writeFileSync(frostPath, JSON.stringify(frostTheme, null, 4) + '\n', 'utf8');
    console.log('Successfully generated complete WinterIsCoding Frost Light.');
}

function generatePreviewVariant(baseThemePath) {
    const previewPath = path.join(THEMES_DIR, 'WinterIsCoding-Preview-color-theme.json');
    console.log('Generating WinterIsCoding Preview (Ergonomic) variant...');
    const rawContent = fs.readFileSync(baseThemePath, 'utf8');
    const themeData = stripCommentsAndParse(rawContent);

    themeData.name = "WinterIsCoding [New] Ergonomic Preview";
    themeData.type = "dark";
    if (!themeData.colors) themeData.colors = {};

    // 1. Inject base modern dark tokens
    for (const [tokenKey, tokenVal] of Object.entries(darkModernUiTokens)) {
        themeData.colors[tokenKey] = tokenVal;
    }

    // Replace deprecated editorIndentGuide tokens with background1
    if (themeData.colors["editorIndentGuide.background"]) {
        themeData.colors["editorIndentGuide.background1"] = themeData.colors["editorIndentGuide.background"];
        delete themeData.colors["editorIndentGuide.background"];
    }
    if (themeData.colors["editorIndentGuide.activeBackground"]) {
        themeData.colors["editorIndentGuide.activeBackground1"] = themeData.colors["editorIndentGuide.activeBackground"];
        delete themeData.colors["editorIndentGuide.activeBackground"];
    }

    // 2. Ocular & Cognitive Refinements on UI Tokens
    themeData.colors["focusBorder"] = "#818cf8";
    themeData.colors["tab.activeBorder"] = "#818cf8";
    themeData.colors["activityBarBadge.background"] = "#818cf8";
    themeData.colors["activityBar.activeBorder"] = "#818cf8";
    themeData.colors["activityBarTop.activeBorder"] = "#818cf8";
    themeData.colors["editor.lineHighlightBackground"] = "#818cf814";
    themeData.colors["selection.background"] = "#6366f1";
    themeData.colors["editor.selectionBackground"] = "#6366f133";

    // 3. Bracket pairs & guides: Tier 6 as ice sky blue to eliminate false error alarm anxiety
    themeData.colors["editorBracketHighlight.foreground1"] = "#ffcc5c";
    themeData.colors["editorBracketHighlight.foreground2"] = "#5eead4";
    themeData.colors["editorBracketHighlight.foreground3"] = "#ae81ff";
    themeData.colors["editorBracketHighlight.foreground4"] = "#818cf8";
    themeData.colors["editorBracketHighlight.foreground5"] = "#9bb955";
    themeData.colors["editorBracketHighlight.foreground6"] = "#38bdf8";
    themeData.colors["editorBracketHighlight.unexpectedBracket.foreground"] = "#f48771";

    themeData.colors["editorBracketPairGuide.activeBackground1"] = "#ffcc5c77";
    themeData.colors["editorBracketPairGuide.activeBackground2"] = "#5eead477";
    themeData.colors["editorBracketPairGuide.activeBackground3"] = "#ae81ff77";
    themeData.colors["editorBracketPairGuide.activeBackground4"] = "#818cf877";
    themeData.colors["editorBracketPairGuide.activeBackground5"] = "#9bb95577";
    themeData.colors["editorBracketPairGuide.activeBackground6"] = "#38bdf877";

    // 4. Semantic tokens
    if (!themeData.semanticTokenColors) themeData.semanticTokenColors = {};
    themeData.semanticTokenColors["string"] = { "foreground": "#5eead4" };
    themeData.semanticTokenColors["keyword"] = { "foreground": "#818cf8" };
    themeData.semanticTokenColors["storage"] = { "foreground": "#818cf8" };
    themeData.semanticTokenColors["enumMember"] = { "foreground": "#5eead4" };
    themeData.semanticTokenColors["property"] = { "foreground": "#77d2ff" };
    themeData.semanticTokenColors["parameter"] = { "foreground": "#9cdcfe" };
    themeData.semanticTokenColors["type"] = { "foreground": "#8dbdff" };
    themeData.semanticTokenColors["class"] = { "foreground": "#8dbdff" };
    themeData.semanticTokenColors["interface"] = { "foreground": "#8dbdff" };
    themeData.semanticTokenColors["function"] = { "foreground": "#ffcc5c" };
    themeData.semanticTokenColors["method"] = { "foreground": "#ffcc5c" };
    themeData.semanticTokenColors["macro"] = { "foreground": "#ae81ff" };

    // 5. Update TextMate tokenColors scopes
    if (Array.isArray(themeData.tokenColors)) {
        for (const tokenRule of themeData.tokenColors) {
            if (!tokenRule.scope || !tokenRule.settings) continue;

            const scopes = Array.isArray(tokenRule.scope) ? tokenRule.scope : [tokenRule.scope];

            // Shift Strings to Arctic Mint #5eead4 (eliminates cyan-blue overlap with Types)
            const isString = scopes.some(s => typeof s === 'string' && (
                s.includes('string') ||
                s.includes('punctuation.definition.string')
            ) && !s.includes('regexp') && !s.includes('template.expression'));

            if (isString && tokenRule.settings.foreground) {
                tokenRule.settings.foreground = "#5eead4";
            }

            // Lift Keywords/Storage to #818cf8 for 5.6:1 WCAG AA contrast against #1a1a1a
            const isKeyword = scopes.some(s => typeof s === 'string' && (
                s.startsWith('keyword') ||
                s.includes('keyword.control') ||
                s.includes('keyword.operator.logical') ||
                s.startsWith('storage.type') ||
                s.startsWith('storage.modifier')
            ));

            if (isKeyword && tokenRule.settings.foreground && (tokenRule.settings.foreground.toLowerCase() === '#6366f1' || tokenRule.settings.foreground.toLowerCase() === '#ffffff')) {
                tokenRule.settings.foreground = "#818cf8";
            }
        }
    }

    fs.writeFileSync(previewPath, JSON.stringify(themeData, null, 4) + '\n', 'utf8');
    console.log('Successfully generated WinterIsCoding Preview (Ergonomic).');
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

// Generate OLED, Light, and Ergonomic Preview variants
generateOledVariant(path.join(THEMES_DIR, 'WinterIsCoding-color-theme.json'));
generateFrostLightVariant(path.join(THEMES_DIR, 'WinterIsCoding-color-theme.json'));
generatePreviewVariant(path.join(THEMES_DIR, 'WinterIsCoding-color-theme.json'));

console.log('All themes built successfully!');


