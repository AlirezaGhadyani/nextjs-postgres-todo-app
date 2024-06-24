import { forwardRef } from "react";
import { useBoolean } from "@/hooks";
import { cn } from "@/libs";

import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  function PasswordInput(props, ref) {
    const { value: showPass, toggle: toggleShowPass } = useBoolean(false);
    const disabled =
      props.value === "" || props.value === undefined || props.disabled;

    return (
      <div className="w-full relative">
        <Input
          {...props}
          ref={ref}
          type={showPass ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", props.className)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 bottom-0 h-full px-3 py-2 hover:bg-transparent"
          disabled={disabled}
          onClick={toggleShowPass}
        >
          {showPass && !disabled ? <EyeOffIcon /> : <EyeIcon />}
          <span className="sr-only">
            {showPass ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
