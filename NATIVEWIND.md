# NativeWind Styling Reference

**Version in this project:** `nativewind@^5.0.0-preview.4` (Tailwind v4 under the hood)

---

## Decision Order

Use this order every time you need to style something:

1. **`className` first** — if the property maps to a Tailwind utility, use it
2. **Inline `style` second** — for one-off values that can't be expressed in Tailwind (rgba colors, fontFamily, resizeMode)
3. **`StyleSheet.create` last** — only when required by a component API or when the value is reused and complex

Never put something in `StyleSheet` if it can be expressed as a className.

---

## What Always Uses StyleSheet

These are non-negotiable because of how the component API works:

| Scenario | Why | Example |
|---|---|---|
| `SafeAreaView` | `className` not supported | `style={{ flex: 1, backgroundColor: '#fff' }}` |
| `ScrollView contentContainerStyle` | Named prop, not `style` | `contentContainerStyle={styles.content}` |
| `KeyboardAvoidingView behavior` | Prop value, not style | `behavior="padding"` |
| `Animated.View` style values | Animated values can't go through NW | `style={[styles.box, animatedStyle]}` |
| Dynamic runtime styles | Values computed in render | `style={{ width: \`${progress * 100}%\` }}` |

---

## What Uses Inline Style (Not StyleSheet)

These go inline because they're one-off values, not reusable blocks:

### fontFamily

fontFamily is a React Native-specific prop. Use inline style for the font, className for everything else.

```tsx
// ✅ Correct — fontFamily inline, color/size via className
<Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-[14px] text-streak">
  {STREAK}
</Text>

// ❌ Avoid — fontFamily in NativeWind doesn't map to the Poppins files
<Text className="font-semibold text-streak">...</Text>
```

**Exception:** If a typography class from `global.css` already covers the font you need, just use the class — no inline style required.

```tsx
// ✅ caption sets Poppins-Regular 11px — no inline style needed
<Text className="caption text-secondary">Daily goal</Text>

// ✅ h4 sets Poppins-Medium 16px — no inline style needed
<Text className="h4 text-primary">Today's plan</Text>
```

**Available typography classes** (from `global.css`):

| Class | Font | Size |
|---|---|---|
| `h1` | Poppins-Bold | 32px |
| `h2` | Poppins-SemiBold | 24px |
| `h3` | Poppins-SemiBold | 20px |
| `h4` | Poppins-Medium | 16px |
| `body-lg` | Poppins-Regular | 16px |
| `body-md` | Poppins-Regular | 14px |
| `body-sm` | Poppins-Regular | 13px |
| `caption` | Poppins-Regular | 11px |

If you need a font/size combination not in this table (e.g. Poppins-SemiBold at 14px), use `style={{ fontFamily: '...' }}` inline and className for color/size.

### rgba and off-theme colors

Colors in the theme use className (`text-primary`, `bg-surface`, etc.). If a color is not in the theme — especially `rgba(...)` for opacity — use inline style.

```tsx
// ✅ rgba color not expressible as className
<Text className="caption" style={{ color: 'rgba(255,255,255,0.75)' }}>
  Continue learning
</Text>

// ✅ custom hex not in theme — inline style or StyleSheet if reused
<View style={{ backgroundColor: '#FFF8EE' }} className="rounded-2xl p-4">
```

### Image sizing and resizeMode

`resizeMode` is an Image-specific React Native prop. Always use inline style for it. For `width`/`height` on Image, inline style is also safest since remote images require explicit dimensions.

```tsx
// ✅ All image-specific props in one inline style object
<Image
  source={images.streakFire}
  style={{ width: 20, height: 20, resizeMode: 'contain' }}
/>

// ✅ No resizeMode — can still use inline style for Image dimensions
<Image
  source={{ uri: user.avatarUrl }}
  style={{ width: 52, height: 52, borderRadius: 26 }}
/>
```

---

## What Uses className

Everything else. Common patterns:

### Layout

```tsx
<View className="flex-1 flex-row items-center justify-between gap-3 px-5 pt-4" />
<View className="absolute inset-0" />
<View className="self-start" />
```

### Spacing

```tsx
<View className="mt-4 mx-5 p-4" />
<Text className="mb-0.75 mt-1" />   {/* 3px, 4px */}
<View className="mt-3.5" />          {/* 14px */}
```

### Colors (from theme)

```tsx
<View className="bg-lingua-purple bg-surface bg-border bg-streak bg-lingua-green" />
<Text className="text-primary text-secondary text-lingua-purple text-streak" />
<View className="border-border border-2" />
```

**Full theme palette:**

| Class suffix | Value |
|---|---|
| `lingua-purple` | `#6C4EF5` |
| `lingua-deep-purple` | `#5838F6` |
| `lingua-blue` | `#4D88FF` |
| `lingua-green` | `#21C168` |
| `streak` | `#FF8A00` |
| `primary` | `#0D132B` |
| `secondary` | `#687280` |
| `border` | `#E5E7EB` |
| `surface` | `#F6F7FB` |
| `background` | `#FFFFFF` |

### Border radius

```tsx
<View className="rounded-xl" />    {/* 12px */}
<View className="rounded-2xl" />   {/* 16px */}
<View className="rounded-3xl" />   {/* 24px */}
<View className="rounded-full" />  {/* 9999px — use for circles/pills */}
```

### Sizing

```tsx
<View className="w-7 h-7" />    {/* 28 x 28 */}
<View className="w-10 h-10" />  {/* 40 x 40 */}
<View className="w-11 h-11" />  {/* 44 x 44 */}
<View className="w-20 h-20" />  {/* 80 x 80 */}
<View className="h-2" />         {/* 8px — progress bar track/fill */}
<View className="h-px" />        {/* 1px — divider */}
```

### TouchableOpacity

`className` works on `TouchableOpacity` for static layout and color. Use `style` only if you need pressed-state styles (e.g., `style={({ pressed }) => ...}`).

```tsx
// ✅ Static styles — use className
<TouchableOpacity
  className="bg-white px-5 py-2 rounded-full self-start mt-3.5"
  activeOpacity={0.85}
>

// ✅ Pressed state — use style prop
<TouchableOpacity
  style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
>
```

---

## Arbitrary Values

NativeWind v5 supports Tailwind v4 arbitrary values. Use canonical classes when they exist; fall back to `[value]` syntax only when needed.

```tsx
// ✅ Use canonical class when it exists
<Text className="mb-0.75" />    {/* not mb-[3px] */}
<View className="mt-3.5" />     {/* not mt-[14px] */}

// ✅ Arbitrary value when no canonical class fits
<View className="h-[172px]" />
<Text className="text-[14px]" />
```

---

## Mixing className and style

When you must mix both, remember:

- `style` prop always wins over `className` on the same property (higher specificity)
- Keep the split logical: className for layout/color, inline `style` for the exception property only

```tsx
// ✅ Clear split — className for layout, inline for the rgba exception
<Text
  className="caption"
  style={{ color: 'rgba(255,255,255,0.75)' }}
>

// ✅ Clear split — className for everything, inline only for fontFamily
<Text
  style={{ fontFamily: 'Poppins-Medium' }}
  className="text-[14px] text-primary"
>
```

---

## Common Gotchas

- **`SafeAreaView className` silently does nothing** — always use `style={}` on it
- **Image width/height via className may not render correctly** for remote images — use inline `style` instead
- **fontFamily via NativeWind font utilities** (`font-medium`, `font-semibold`) maps to font-weight, not the Poppins font files — use `style={{ fontFamily: 'Poppins-...' }}` or a typography class
- **Shadow** — cross-platform shadow syntax differs; use StyleSheet with platform checks, not className
- **`letterSpacing`** — keep in `style` as it behaves differently per platform
