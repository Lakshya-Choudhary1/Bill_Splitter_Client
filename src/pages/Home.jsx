import React from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Users,
  Receipt,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Wallet />,
      title: "Smart Tracking",
      desc: "Track every expense easily",
    },
    {
      icon: <Users />,
      title: "Groups",
      desc: "Split bills with friends",
    },
    {
      icon: <Receipt />,
      title: "Reports",
      desc: "View expense history",
    },
    {
      icon: <ShieldCheck />,
      title: "Secure",
      desc: "Your data is protected",
    },
  ];

  return (
    <div
      className="
      min-h-screen
      bg-linear-to-r
      from-blue-50
      via-white
      to-green-50
      px-5
    "
    >
      {/* Navbar + Hero */}

      <div>
        {/* Navbar */}

        <nav
          className="
          h-16
          flex
          items-center
          justify-between
        "
        >
          <div className="flex items-center gap-2">
            <div
              className="
              w-10
              h-10
              rounded-xl
              bg-gradient-to-br
              from-blue-600
              to-green-500
              flex
              items-center
              justify-center
              text-white
              font-bold
              shadow
            "
            >
              B
            </div>

            <h1
              className="
              text-xl
              font-bold
            "
            >
              Bill
              <span className="text-blue-600">Split</span>
            </h1>
          </div>

          <Link
            to="/login"
            className="
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-xl
              text-sm
            "
          >
            Login
          </Link>
        </nav>

        {/* Hero */}

        <section
          className="
          text-center
          pt-8
          pb-10
        "
        >
          <div
            className="
            mx-auto
            w-24
            h-24
            rounded-[30px]
            bg-gradient-to-br
            from-blue-600
            to-green-400
            flex
            items-center
            justify-center
            shadow-xl
          "
          >
            <Wallet size={45} className="text-white" />
          </div>

          <h1
            className="
            mt-8
            text-4xl
            font-extrabold
            text-gray-900
            leading-tight
          "
          >
            Split money
            <br />
          </h1>

          <p
            className="
            mt-4
            text-gray-500
            text-sm
          "
          >
            Manage groups, track expenses and settle payments easily.
          </p>

          <Link
            to="/register"
            className="
              mt-7
              flex
              items-center
              justify-center
              gap-2
              bg-linear-to-br
              from-blue-600
              to-green-500
              text-white
              py-3
              rounded-2xl
              font-semibold
              shadow-lg
            "
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>

      {/* Balance Card */}

      <div
        className="
        bg-white
        rounded-3xl
        p-5
        shadow-lg
      "
      >
        <div
          className="
          flex
          justify-between
          items-center
        "
        >
          <div>
            <p className="text-gray-500 text-sm">Total Balance</p>

            <h2
              className="
              text-3xl
              font-bold
            "
            >
              ₹24,850
            </h2>
          </div>

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            text-green-600
          "
          >
            <Sparkles />
          </div>
        </div>
      </div>

      {/* Features */}

      <h2
        className="
        mt-10
        text-xl
        font-bold
      "
      >
        Features
      </h2>

      <div
        className="
        grid
        grid-cols-2
        gap-4
        mt-5
      "
      >
        {features.map((item, index) => (
          <div
            key={index}
            className="
                bg-white
                rounded-3xl
                p-4
                shadow-sm
              "
          >
            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
              "
            >
              {item.icon}
            </div>

            <h3
              className="
                font-bold
                mt-3
              "
            >
              {item.title}
            </h3>

            <p
              className="
                text-xs
                text-gray-500
              "
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}

      <div
        className="
        mt-8
        rounded-3xl
        p-6
        bg-linear-to-r
        from-blue-600
        to-green-500
        text-white
      "
      >
        <h2 className="text-xl font-bold">Ready to split?</h2>

        <p className="mt-2 text-sm opacity-90">
          Start managing expenses today.
        </p>

        <Link
          to="/register"
          className="
            inline-block
            mt-5
            bg-white
            text-blue-600
            px-6
            py-2
            rounded-xl
            font-semibold
          "
        >
          Create Account
        </Link>
      </div>

      {/* Footer */}

      <footer
        className="
        text-center
        text-xs
        text-gray-500
        py-6
      "
      >
        © 2026 BillSplit. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
