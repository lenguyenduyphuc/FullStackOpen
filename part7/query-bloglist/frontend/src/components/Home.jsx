import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to My Blog Website</CardTitle>
          <CardDescription>Explore a world of interesting articles and stories</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This is a platform where you can read, write, and share your thoughts with a community of like-minded individuals.
            Whether you're here to learn, share, or just browse, we hope you'll find something that interests you.
          </p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link to="/blogs">
                Browse Blogs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/users">
                View Users <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

