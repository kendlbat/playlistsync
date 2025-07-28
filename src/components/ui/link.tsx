import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

function Link({
    className,
    variant,
    size,
    disabled,
    asChild = false,
    ...props
}: React.ComponentProps<"a"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        disabled?: boolean;
    }) {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            data-slot="a"
            className={cn(
                buttonVariants({ variant, size, className }),
                disabled ? "pointer-events-none opacity-50" : ""
            )}
            {...props}
        />
    );
}

export { buttonVariants, Link };
