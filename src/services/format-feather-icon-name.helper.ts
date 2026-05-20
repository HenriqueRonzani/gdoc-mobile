export const formatFeatherIconName = (iconName: string): string => {
  if (!iconName) return 'help-circle';

  return iconName
    .replace(/Icon$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
};
