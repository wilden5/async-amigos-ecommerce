export default function JustValidatePluginDate(): { validate: () => boolean | string } {
  return {
    validate: (): boolean => true,
  };
}
