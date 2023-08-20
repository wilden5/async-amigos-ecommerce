export default function JustValidatePluginDate(): { validate: () => boolean } {
  return {
    validate: (): boolean => true,
  };
}
