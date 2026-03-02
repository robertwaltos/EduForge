import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

/**
 * Checks if the haptics plugin is available on the current platform.
 * Haptics are only available on native mobile platforms (iOS, Android).
 * @returns {boolean} True if haptics are available, false otherwise.
 */
const isHapticsAvailable = (): boolean => {
  return Capacitor.isPluginAvailable('Haptics');
};

/**
 * Triggers a light haptic tap, suitable for a successful action or selection.
 * This is a "fire and forget" function.
 */
export const hapticSuccess = async (): Promise<void> => {
  if (!isHapticsAvailable()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (error) {
    console.error('Haptic success feedback failed:', error);
  }
};

/**
 * Triggers a haptic notification for an error. On iOS, this is a distinct double-tap pattern.
 * This is a "fire and forget" function.
 */
export const hapticError = async (): Promise<void> => {
  if (!isHapticsAvailable()) return;
  try {
    await Haptics.notification({ type: NotificationType.Error });
  } catch (error) {
    console.error('Haptic error feedback failed:', error);
  }
};

/**
 * Triggers a longer, more noticeable haptic vibration for a celebration moment, like completing a game.
 * This is a "fire and forget" function.
 */
export const hapticCelebration = async (): Promise<void> => {
  if (!isHapticsAvailable()) return;
  try {
    // A longer vibration is more celebratory than a simple tap.
    // The default is 300ms, which is quite long. We'll use that.
    // On iOS, this uses the CoreHaptics engine for a more nuanced feel if available.
    await Haptics.vibrate();
  } catch (error) {
    console.error('Haptic celebration feedback failed:', error);
  }
};

/**
 * Triggers a light haptic impact for selection or hover effects.
 */
export const hapticSelection = async (): Promise<void> => {
  if (!isHapticsAvailable()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (error) {
    console.error('Haptic selection feedback failed:', error);
  }
};

/**
 * Triggers a warning haptic — medium impact to alert the user.
 */
export const hapticWarning = async (): Promise<void> => {
  if (!isHapticsAvailable()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch (error) {
    console.error('Haptic warning feedback failed:', error);
  }
};