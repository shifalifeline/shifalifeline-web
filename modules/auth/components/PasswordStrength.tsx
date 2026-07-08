interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  const score =
    Number(password.length >= 8) +
    Number(/[A-Z]/.test(password)) +
    Number(/[a-z]/.test(password)) +
    Number(/\d/.test(password));

  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="space-y-2">
      <div className="h-2 rounded bg-gray-200">
        <div
          className="h-2 rounded bg-green-600 transition-all"
          style={{
            width: `${score * 25}%`,
          }}
        />
      </div>

      <p className="text-sm text-gray-600">
        {labels[score]}
      </p>
    </div>
  );
}