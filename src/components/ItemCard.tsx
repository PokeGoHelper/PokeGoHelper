import { Card } from "./ui/card";

interface ItemCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export function ItemCard({ name, description, icon, category }: ItemCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200 border-border h-full">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full flex items-center justify-center text-accent">
          {icon}
        </div>
        
        <div className="space-y-2">
          <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
            {category}
          </div>
          <h4 className="text-foreground">{name}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}
