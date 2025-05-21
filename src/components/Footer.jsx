export default function Footer() {
    return (
        <footer className="bg-blue-500 text-white py-4 rounded-t-md">
            <div className="flex justify-between items-center max-w-5xl mx-auto px-4">
                <p className="text-sm">&copy; 2025 BookShop. All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="#" className="hover:underline text-sm">Privacy Policy</a>
                    <a href="#" className="hover:underline text-sm">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
