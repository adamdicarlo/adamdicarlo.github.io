module FlashyHome exposing (main)

-- elm-lang/animation-frame

import AnimationFrame


-- elm-lang/core

import Task
import Color exposing (linear, rgb)


-- elm-lang/html

import Html exposing (..)
import Html.App as Html


-- evancz/elm-graphics

import Collage exposing (collage, dashed, defaultLine, gradient, move, rect, segment, traced)
import Element exposing (toHtml)


-- elm-lang/window

import Window exposing (..)


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Model


type alias Model =
    { size : Window.Size
    , angle : Int
    }


type Msg
    = Resize Window.Size
    | Step
    | Fail


init : ( Model, Cmd Msg )
init =
    let
        initialModel =
            { size = Window.Size 0 0, angle = 0 }
    in
        initialModel ! [ Task.perform (\_ -> Fail) (\size -> Resize size) Window.size ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Resize newSize ->
            { model | size = newSize } ! []

        Step ->
            { model | angle = (model.angle + 1) % 360 } ! []

        Fail ->
            model ! []


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch [ Window.resizes Resize, AnimationFrame.times (\_ -> Step) ]


view : Model -> Html Msg
view model =
    let
        ( w, h ) =
            ( model.size.width, model.size.height )

        ( fw, fh ) =
            ( toFloat w, toFloat h )

        r =
            degrees <| toFloat model.angle

        clrStops =
            [ ( 0.0, rgb 5 250 140 ), ( 1.0, rgb 231 59 87 ) ]

        from =
            ( -fw/4 * cos r, fh/4 * sin r )

        to =
            ( fw/4 * cos r, -fh/4 * sin r )

        gfx =
            collage w h [
              gradient (linear from to clrStops) (rect fw fh),
              traced { defaultLine | width=55, color=Color.rgba 200 30 100 0.5 } (segment from to)
              ]
    in
        toHtml gfx
