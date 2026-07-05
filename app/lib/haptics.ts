type HapticIntent = "light" | "success" | "warning";

export async function triggerHaptic(intent: HapticIntent = "light") {
  if (typeof window === "undefined") return;

  try {
    const { Haptics, ImpactStyle, NotificationType } = await import("@capacitor/haptics");

    if (intent === "success") {
      await Haptics.notification({ type: NotificationType.Success });
      return;
    }

    if (intent === "warning") {
      await Haptics.notification({ type: NotificationType.Warning });
      return;
    }

    await Haptics.impact({ style: ImpactStyle.Light });
    return;
  } catch {
    // Current OTA installs may not have the native Haptics plugin yet.
  }

  if ("vibrate" in navigator) {
    const pattern = intent === "light" ? 10 : intent === "success" ? [12, 24, 12] : [30, 20, 30];
    navigator.vibrate(pattern);
  }
}
