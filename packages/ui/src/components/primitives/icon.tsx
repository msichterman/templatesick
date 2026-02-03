import * as React from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react-native';

type IconProps = LucideProps & {
  as: LucideIcon;
  className?: string;
};

/**
 * A wrapper component for Lucide icons.
 *
 * Note: className styling via uniwind was removed due to Metro bundling issues.
 * Use the color prop directly to style icon colors.
 *
 * @component
 * @example
 * ```tsx
 * import { ArrowRight } from 'lucide-react-native';
 * import { Icon } from '@repo/ui';
 *
 * <Icon as={ArrowRight} color="#ef4444" size={16} />
 * ```
 *
 * @param {LucideIcon} as - The Lucide icon component to render.
 * @param {number} size - Icon size (defaults to 14).
 * @param {...LucideProps} ...props - Additional Lucide icon props passed to the "as" icon.
 */
function Icon({ as: IconComponent, className, size = 14, ...props }: IconProps) {
  return (
    <IconComponent
      size={size}
      {...props}
    />
  );
}

export { Icon };
